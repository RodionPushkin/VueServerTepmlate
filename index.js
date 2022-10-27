require('dotenv').config()
const express = require('express')
const app = express();
const {ExpressPeerServer} = require('peer');
const http = require('http');
const https = require('https');
const session = require('cookie-session');
const history = require('connect-history-api-fallback');
const path = require('path');
const db = require("./database");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 80;
const ruid = require('express-ruid');
const {secret} = require('./config.json');
const fileUpload = require('express-fileupload');
const swaggerJsDoc = require('swagger-jsdoc')
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "some title",
            description: "some description",
            contact: {
                name: "Rodion Pushkin",
                url: "https://t.me/RodionPushkin"
            },
            servers: ['http://127.0.0.1']
        }
    },
    apis: ['./router.js', './peer.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const limiter  =  require( "express-rate-limit");
const slowDown  =  require( "express-slow-down");
const compression  =  require( "compression");
app.use(limiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many accounts created from this IP, please try again after an 15 min',
    standardHeaders: true,
    legacyHeaders: false,
}))
app.use(slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 500
}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    abortOnLimit: true,
    limits: {fileSize: 50 * 1024 * 1024},
}));
app.use(require('cors')({
    credentials: true,
    methods: ['OPTION', 'GET', 'POST', 'PUT', 'DELETE'],
    origin: '*'
}));
app.use(ruid());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        path: '/',
        maxAge: 2592000000,
        secure: process.env.NODE_ENV == 'production',
        httpOnly: true
    },
}));
app.use(helmet());
app.use(compression())
require('./router')(app)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
let server;
let peer
if(process.env.NODE_ENV == 'production'){
    const ssl = {
        key: fs.readFileSync(path.join(__dirname, 'privkey.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'fullchain.pem'))
    }
    server = https.createServer(ssl,app);
    peer = ExpressPeerServer(server, {
        path: '/peer',
        ssl: ssl
    });
}else{
    server = http.createServer(app);
    peer = ExpressPeerServer(server, {
        path: '/peer',
    });
}
require('./peer')(peer)
app.use('/', peer);
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(history({
    index: '/index.html'
}));
app.use(express.static(path.join(__dirname, 'dist')));
try {
    server.listen(process.env.NODE_ENV == 'production' ? 443 : port, () => {
        console.clear()
        console.log(`Server started on: http://${process.env.DOMAIN}:${port} at ${new Date().toLocaleString('ru')}`)
        db.checkConnection()
    });
} catch (e) {
    console.log(e)
}
