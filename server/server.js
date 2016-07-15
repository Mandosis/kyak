'use strict';

require('dotenv').config();
const express = require('express');
const debug = require('debug')('server');
const config = require('../modules/config');

const app = express();

let server = app.listen(process.env.PORT || config.port, () => {
  let port = server.address().port;
  debug('listening on port ' + port);
});
