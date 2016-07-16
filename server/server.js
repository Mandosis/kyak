'use strict';

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const debug = require('debug')('server');
const error = require('debug')('server:error');
const config = require('../modules/config');
const thinky = require('thinky')(config.database);

let app = express();

// Connect to database
thinky.dbReady()
  .then(() => {
    debug('connected to database');
  })
  .error((error) => {
    error(error);
  });

// Parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Help protect application
app.use(helmet());

// Start a webserver on a port set via config.json or environment variable
let server = app.listen(process.env.PORT || config.port, () => {
  let port = server.address().port;
  debug('listening on port ' + port);
});
