var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');
const DefaultResponses = require('../common/DefaultResponses').DefaultResponses;
const User = require('../model/User').User;
//logging
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'middleware'});

function ensureAuthenticated(req, res, next) {
  if(!req.body.token) {
    return res.json(DefaultResponses.noTokenProvided);
  }

  var token = req.body.token;
  if(!validateToken(token)) {
     return res.json(DefaultResponses.tokenExpired);
  }

  //Ckeck that the user id is asociated with the validtoken in users collection
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  const userIdFromToken = payload.sub;
  User.findOne({_id: userIdFromToken, validToken: token }, function (err, user) {
    if (err) {
      const errorResponse = DefaultResponses.unHandledError
      res.json(errorResponse)
      return;
    }
    if (!user) {
      const errorResponse = DefaultResponses.userNotFound
      res.json(errorResponse)
      return
    }
    req.userId = userIdFromToken;
    next();
  })
}

function validateToken(token) {
  if(token){
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    if(payload.exp > moment().unix()) {
       return true;
    }
  }
  return false
}

exports.ensureAuthenticated = ensureAuthenticated;
exports.validateToken = validateToken;
