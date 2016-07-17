'use strict';

const bcrypt = require('bcrypt');
const _ = require('lodash');
const debug = require('debug')('user');
const error = require('debug')('user:error');
const config = require('../modules/config');
const thinky = require('../modules/thinky');

const r = thinky.r;
const type = thinky.type;

const SALT_WORK_FACTOR = 10;

let User = thinky.createModel("User", {
  id: type.string(),
  username: type.string().required(),
  password: type.string().required(),
  email: type.string().email().required()
});

// Check if the value was modified
User.define('isModified', function (key, cb) {
  let user = this;


  User.filter({ id: user.id }).run()
    .then((result) => {
      if (_.isEmpty(result)) {
        cb(false);
      } else if (user[key] === result[0][key]) {
        cb(true);
      } else {
        cb(false);
      }
    })

    // Reject with error message
    .error((err) => {
      cb(error);
    });
});

// Compare passwords during authentication
User.define('comparePassword', (candidatePassword, done) => {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return done(err);
    } else {
      done(null, isMatch);
    }
  });
});

// Encrypt password on save
User.pre('save', function (next) {
  let user = this;

  user.isModified('password', (result) => {
    if (result) {
      return next();
    } else {
      // Create salt for hash
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
          return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err);
          }

          // Replace clear text with hashed password
          user.password = hash;

          next();
        });
      });
    }
  })
});

module.exports = User;
