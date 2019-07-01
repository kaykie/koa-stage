#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('demo:server');
var http = require('http');
var config = require('../config');
var fs = require('fs');
var logConfig = require('../config/log_config');
console.log(config);
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(config.port || '3000');
// app.set('port', port);

// 打印端口号
console.log('port = '+ config.port)
/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


var confirmPath = function(pathStr) {

  if(!fs.existsSync(pathStr)){
    fs.mkdirSync(pathStr);
    console.log('createPath: ' + pathStr);
  }
}

/**
 * 初始化log相关目录
 */
var initLogPath = function(){
  //创建log的根目录'logs'
  if(logConfig.baseLogPath){
    confirmPath(logConfig.baseLogPath)
    //根据不同的logType创建不同的文件目录
    for(var i = 0, len = logConfig.appenders.length; i < len; i++){
      if(logConfig.appenders[i].path){
        confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path);
      }
    }
  }
}

initLogPath();
