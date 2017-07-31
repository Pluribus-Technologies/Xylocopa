'use strict';

var app = require('./app');
const debug = require('debug')('app:server');
const http = require('http');
const mongoose = require('mongoose');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

app.db = connectMongo()
  .on('error', console.log)
  .on('disconnected', connectMongo)
  .once('open', listen);

server.on('error', onError);
server.on('listening', onListening);

function listen () {
  server.listen(port);
}

function connectMongo () {
  return mongoose.connect('mongodb://db:27017').connection;
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}