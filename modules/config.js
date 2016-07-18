'use strict';

const fs = require('fs');
const path = require('path');
const winston = require('winston');

winston.addColors({
  debug: 'green',
  info: 'cyan',
  silly: 'magenta',
  warn:  'yellow',
  error: 'red'
});
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: process.env.LOG_LEVEL,
  colorize:true
});


// Read the configuration file
let file = fs.readFileSync(path.join(__dirname, '../config.json'));

// Parse file contents to JSON
let config = JSON.parse(file);

winston.debug('Config file loaded')

module.exports = config;
