const express = require('express')
const http2Express = require('http2-express-bridge')
const app = process.env.NODE_ENV == 'production' ? http2Express(express) : express();
const {ExpressPeerServer} = require('peer');
const http = require('http');
const https = require('http2');
const session = require('cookie-session');
const history = require('connect-history-api-fallback');
const path = require('path');
const db = require("./database");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.NODE_ENV == 'production' ? 443 : 80;
const ruid = require('express-ruid');
const config = require('../config.json');
const fileUpload = require('express-fileupload');
const swaggerJsDoc = require('swagger-jsdoc')
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const {promisify} = require("util")
const readFile = promisify(fs.readFile)
const errorMiddleware = require('./middleware/error.middleware')
const swaggerDocs = swaggerJsDoc({
  swaggerDefinition: {
    info: {
      title: "Документация", description: "Ниже представлена документация к api", contact: {
        name: "Rodion Pushkin", url: "https://t.me/RodionPushkin"
      }
    }
  }, apis: ['./server/router.js']
});
app.use(fileUpload({
  useTempFiles: true, tempFileDir: '/tmp/',
  // abortOnLimit: true,
  limits: {fileSize: 50 * 1024 * 1024},
}));
app.use(ruid());
app.use(session({
  secret: config.secret, resave: false, saveUninitialized: false, proxy: true, cookie: {
    path: '/', maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV == 'production', httpOnly: true
  },
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false
  }),
);
require('./router')(app)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use("/api/static", express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(history({
  index: '/index.html'
}));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use("/", express.static(path.join(__dirname, 'dist')));

app.use(errorMiddleware)
let server;
let peer
if (process.env.NODE_ENV == 'production') {
  const options = {
    key: fs.readFileSync(path.join(__dirname, '../privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../fullchain.pem')),
    allowHTTP1: true
  }
  app.get("/push", async (req, res) => {
    try {
      let files = []
      await fs.readdir('./dist/', (err, readedfiles) => {
        readedfiles.filter(item => item.includes('.') && item != '.gitkeep' && item != 'index.html').forEach(file => {
          files.push(file)
        })
      });
      await fs.readdir('./dist/assets', (err, readedfiles) => {
        readedfiles.filter(item => item.includes('.') && item != '.gitkeep').forEach(file => {
          files.push(file)
        })
      });
      if (res.push) {
        files.forEach(async (file) => {
          res.push(file, {}).end(await readFile(`dist${file}`))
        })
      }

      res.writeHead(200)
      res.end(await readFile("dist/index.html"))
    } catch (error) {
      res.status(500).send(error.toString())
    }
  })
  server = https.createSecureServer(options, app);
  peer = ExpressPeerServer(server, {
    path: '/peerjs', ssl: options, proxied: true,
  });
} else {
  server = http.createServer(app);
  peer = ExpressPeerServer(server, {
    path: '/peerjs',
    secure: false,
    debug: true,
    allow_discovery: true,
  });
}
app.use('/', peer);
require('./peer')(peer)
global.peer = peer
try {
  server.listen(port, () => {
    console.log(`Server started on: http${port == 443 ? 's' : ''}://${config.DOMAIN} at ${new Date().toLocaleString('ru')}`)
    db.checkConnection()
  });
} catch (e) {
  console.log(e)
}
