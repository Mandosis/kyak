'use strict';

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const winston = require('winston');
const config = require('../modules/config');
const router = require('./routes/router');
const database = require('./database');

let app = express();

/*
 * Connect to database
 */
database.connect();

/*
 * Configure Middleware
 */

// Parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

// Help protect application
app.use(helmet());

// Routes
app.use('/', router);

/*
 * Start a webserver on a port set via config.json or environment variable
 */
let server = app.listen(process.env.PORT || config.port, () => {
  let port = server.address().port;
  winston.info('Listening on port ' + port);
});
