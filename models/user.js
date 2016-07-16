'use strict';

const thinky = require('thinky')();
const r = thinky.r;
const type = thinky.type;

const SALT_WORK_FACTOR = 10;

let User = thinky.createModel("User", {
  id: type.string().default(r.uuid()),
  username: type.string(),
  password: type.string(),
  email: type.string.email()
});

// Encrypt password on save
User.pre('save', (next) => {
  let user = this;

  if (user.isModified('password')) {
    return next();
  }

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
});

module.exports = User;
