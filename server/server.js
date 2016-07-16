'use strict';

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const debug = require('debug')('server');
const config = require('../modules/config');
const thinky = require('../modules/thinky');

let app = express();

// Database connection


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
