const _ = require('lodash');
const thinky = require('../modules/thinky');
const User = require('../models/user');
const r = thinky.r;

let validate = {
  isAvailable: (field, value, callback) => {
    User.filter(r.row(field).match('(?i)^' + value + '$')).run()
      .then((result) => {
        if (_.isEmpty(result)) {
          callback(true);
        } else {
          callback(false);
        }
    })
  }
};

module.exports = validate;
