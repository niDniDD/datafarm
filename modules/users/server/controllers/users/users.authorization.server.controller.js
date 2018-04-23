'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findOne({
    _id: id
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load User ' + id));
    }

    req.profile = user;
    next();
  });
};

/**
 * Require login token routing middleware
 */
exports.requiresLoginToken = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    // check for login token here
    var loginToken = req.body.loginToken;
    if (!loginToken) {
      next();
    } else {
      User.findOne({
        loginToken: loginToken,
        loginExpires: {
          $gt: Date.now()
        }
      }, function (err, user) {
        if (!user) {
          return res.status(401).send({
            message: 'Token is incorrect or has expired. Please login again'
          });
        }
        if (err) {
          return res.status(500).send({
            message: 'There was an internal server error processing your login token'
          });
        }

        // bind user object to request and continue
        req.user = user;
        next();
      });
    }
    // query DB for the user corresponding to the token and act accordingly

  }


};
