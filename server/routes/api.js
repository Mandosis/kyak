'use strict';

const router = require('express').Router();
const thinky = require('../../modules/thinky');
const debug = require('debug')('api');
const error = require('debug')('api:error');
const User = require('../../models/user');

router.route('/users/:key?')
  .get((req, res) => {
    // Get user
    // let username = req.params.username;
    //
    // if (username) {
    //   // get specific user
    // } else {
    //
    // }
    //

  })
  .post((req, res) => {
    // create user
    let newUser = new User({
      username: req.body.username,
      password: req.body.username,
      email: req.body.email
    });

    User.save(newUser)
      .then((result) => {
        debug(result);
        res.status(201).json({
          success: true,
          message: `User $(req.params.username) created successfully`
        });
      })
      .error((error) => {
        error(error);
        res.status(500).json({
          success: false,
          message: 'Internal Error: Failed to create user'
        });
      });
  })
  .put((req, res) => {
    // update user
  })
  .delete((req, res) => {
    // delete user
  });

module.exports = router;
