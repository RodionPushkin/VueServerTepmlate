const express = require('express')
const app = express();
const session = require('express-session');
const history = require('connect-history-api-fallback');
const path = require('path');
const db = require("./database");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 80;
const ruid = require('express-ruid');
app.use(require('cors')({
    credentials: true,
    methods: ['OPTION', 'GET', 'POST', 'PUT', 'DELETE'],
    origin: '*'
}));
app.use(ruid());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard kat',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        maxAge: 2592000000,
    },
}));
require('./router')(app)
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(history({
    index: '/index.html'
}));
app.use(express.static(path.join(__dirname, 'dist')));
app.listen(port, () => {
    console.clear()
    console.log(`Server started on port: ${port} at ${new Date().toLocaleString('ru')}`)
    // db.checkConnection()
})
