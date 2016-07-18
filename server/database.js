'use strict';

const mongoose = require('mongoose');
const winston = require('winston');
const config = require('../modules/config');

let database = {};

database.connect = () => {
  let MongoDB = mongoose.connect(config.database.uri, config.database.options).connection;

  MongoDB.on('open', () => {
    winston.info('Connected to database');
  });

  MongoDB.on('error', (err) => {
    winston.error('Error connecting to database: ' + err);
  });
};

module.exports = database;
