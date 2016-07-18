'use strict';

const router = require('express').Router();
const winston = require('winston');
const User = require('../../models/user');

router.route('/users/:username?')
  .get((req, res) => {
    // Get all user
  })
  .post((req, res, next) => {
    // Create user
    let user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      normalized: {
        username: req.body.username
      }
    });

    user.save((err) => {
      if (err) {
        winston.error(err);
        res.status(500).json({
          success: false,
          message: 'Internal error'
        })
      } else {
        res.status(201).json({
          success: true,
          message: 'User created'
        })
      }
    })
  })
  .put((req, res) => {
    // update user
  })
  .delete((req, res) => {
    // delete user
  });

module.exports = router;
