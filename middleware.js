var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');
//logging
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'middleware'});

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.body.token) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  var token = req.body.token;
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
     return res
     	.status(401)
        .send({message: "El token ha expirado"});
  }

  req.userId = payload.sub;
  next();
}
