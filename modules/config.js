'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('config')

// Read the configuration file
let file = fs.readFileSync(path.join(__dirname, '../config.json'));

// Parse file contents to JSON
let config = JSON.parse(file);

debug('loaded')

module.exports = config;
