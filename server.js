var express = require('express');
var app = express();

const cors = require('cors');
const corsOptions = {
    origin: 'http://192.168.253.178:8787',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

global.__basedir = 'D:/nodejs/node-uploadfiles/';
// global.__basedir = './';

let router = require('./app/routers/file.router.js');
app.use('/', router);

let server = app.listen(3030, '192.168.253.27', () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);
})