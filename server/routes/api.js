'use strict';

const router = require('express').Router();
const _ = require('lodash');
const thinky = require('../../modules/thinky');
const debug = require('debug')('api:log');
const error = require('debug')('api:error');
const User = require('../../models/user');
const validate = require('../../modules/validate');

const r = thinky.r;

router.route('/users/:key?')
  .get((req, res) => {
    // Get all user
    User.execute()
      .then((result) => {
        res.status(200).json({
          success: true,
          message: 'Retreived all users',
          data: result
        })
      })
  })
  .post((req, res, next) => {

    validate.isAvailable('username', req.body.username, (result) => {
      if (result) {
        validate.isAvailable('email', req.body.email, (result) => {
          if (result) {
            // Create user
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
                  message: `User created successfully`
                });
              })
              .error((err) => {
                console.log(err);
                res.status(500).json({
                  success: false,
                  message: 'Internal Error: Failed to create user'
                });
              });


          } else {
            res.status(200).json({
              success: false,
              message: 'Email address already in use'
            })
          }

        })
      } else {
        res.status(200).json({
          success: false,
          message: 'Username taken'
        });
      }
    });

  })
  .put((req, res) => {
    // update user
  })
  .delete((req, res) => {
    // delete user
  });

module.exports = router;
