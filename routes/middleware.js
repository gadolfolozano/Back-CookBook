var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');
const DefaultResponses = require('../common/DefaultResponses').DefaultResponses;
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

  var payload = jwt.decode(token, config.TOKEN_SECRET);
  req.userId = payload.sub;
  next();
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
