'use strict';

const config = require('./config');

// Configure thinky
const thinky = require('thinky')({
  host: config.database.host,
  port: config.database.port,
  db: config.database.db
});

module.export = thinky;
