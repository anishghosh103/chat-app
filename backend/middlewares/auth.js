const jwt = require('jsonwebtoken');

const User = require('../models/users');

const response = require('../libs/response');
const utils = require('../libs/utils');
const config = require('../config/app.config');

const getAuthToken = (req) => {
  return utils.promise(cb => {
    const authToken = req.cookies.authToken;
    if (authToken) {
      jwt.verify(authToken, config.secret, (err, token) => {
        if (err || token === undefined) cb(null, null);
        else cb(null, token);
      });
    } else {
      cb(null, null);
    }
  });
};

let isAuthenticated = (req, res, next) => {
  getAuthToken(req)
    .then(token => {
      if (token) {
        User.findOne({ userId: token.userId })
          .select('-_id -__v -password')
          .exec()
          .then(user => {
            if (user !== null) {
              req.user = user;
              next();
            } else {
              response.error(res, 'You are not authorized to access this route.', 401);
            }
          })
          .catch(err => response.error(res, err));
      } else {
        response.error(res, 'You are not authorized to access this route.', 401);
      }
    });
};

let isNotAuthenticated = (req, res, next) => {
  getAuthToken(req)
    .then(token => {
      if (token) {
        response.error(res, 'You are already authenticated.', 401);
      } else {
        next();
      }
    });
};

module.exports = { isAuthenticated, isNotAuthenticated };