const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
const { DefaultResponses } = require('../common/DefaultResponses');
const { User } = require('../model/User');

function validateToken(token) {
  if (token) {
    try {
      const payload = jwt.decode(token, config.TOKEN_SECRET);
      if (payload.exp > moment().unix()) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }
  return false;
}

function validateTokenIsInStorage(req, res, next) {
  const { token } = req.headers;
  // Check that the user id is asociated with the validtoken in users collection
  const payload = jwt.decode(token, config.TOKEN_SECRET);
  const userIdFromToken = payload.sub;
  User.findOne({ _id: userIdFromToken, validToken: token }, (err, user) => {
    if (err) {
      const errorResponse = DefaultResponses.unHandledError;
      res.status(errorResponse.error.errorCode);
      res.json(errorResponse);
      return;
    }
    if (!user) {
      const errorResponse = DefaultResponses.userNotFound;
      res.status(errorResponse.error.errorCode);
      res.json(errorResponse);
      return;
    }
    req.user = user.parse();
    next();
  });
}

function ensureAuthenticated(req, res, next) {
  if (!req.headers.token) {
    const errorResponse = DefaultResponses.noTokenProvided;
    res.status(errorResponse.error.errorCode);
    return res.json(errorResponse);
  }

  const { token } = req.headers;
  if (!validateToken(token)) {
    const errorResponse = DefaultResponses.tokenExpired;
    res.status(errorResponse.error.errorCode);
    return res.json(errorResponse);
  }

  return validateTokenIsInStorage(req, res, next);
}

exports.ensureAuthenticated = ensureAuthenticated;
exports.validateToken = validateToken;
