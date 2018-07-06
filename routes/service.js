const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(userId) {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

exports.createToken = createToken;
