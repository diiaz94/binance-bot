var express = require('express');
var http = require('http');
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./app/router');
var socket = require('./app/socket');
//var config = require('./config/main').get(process.env.NODE_ENV);
//var rankingProcedures = require('./app/procedures/ranking');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(http, {
  'pingInterval': 200,
  'pingTimeout': 10000
}).listen(server);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

router(app);
socket.events(io);

server.listen(config.port, function() {
  console.log('Server listening on port', config.port);
});

module.exports = app;