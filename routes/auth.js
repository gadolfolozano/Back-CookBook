var service = require('./service');
var middleware = require('./middleware');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');
const User = require('../model/User').User;
const DefaultResponses = require('../common/DefaultResponses').DefaultResponses;

//login a user by username and password
function login(req, res) {
  const body = req.body;
  console.log('post login', body);
  if(!body.username || !body.password) {
    const errorResponse = DefaultResponses.invalidCredentials
    console.log.error(body, errorResponse)
    res.json(errorResponse)
    return;
  }
  User.findOne({username: body.username, password: body.password}, function (err, user) {
    if (err) {
      const errorResponse = DefaultResponses.unHandledError
      console.log(err, errorResponse)
      res.json(errorResponse)
      return;
    }
    if (!user) {
      const errorResponse = DefaultResponses.userNotFound
      console.log(errorResponse)
      res.json(errorResponse)
      return
    }
    checkTokenAndUpdatIfNeeded(user, res);
  })
}

function checkTokenAndUpdatIfNeeded(userModel, res) {
  const validToken = userModel.validToken;
  if(middleware.validateToken(validToken)){
    sendLoginSuccessResponse(userModel, validToken, res);
  } else {
    generateAndSaveToken(userModel, res);
  }
}

//generate new token and save it in users collection
function generateAndSaveToken(userModel, res){
  const tokenGenerated = service.createToken(userModel._id);
  User.findByIdAndUpdate( userModel._id, { $set: { validToken: tokenGenerated }}, function (err, updatedUser) {
    if (err) {
      const errorResponse = DefaultResponses.unHandledError
      console.log.error(err, errorResponse)
      res.json(errorResponse)
      return;
    }
    if (!updatedUser) {
      const errorResponse = DefaultResponses.userNotFound
      console.log.error(errorResponse)
      res.json(errorResponse)
      return
    }
    sendLoginSuccessResponse(updatedUser, tokenGenerated, res);
  })
}

function sendLoginSuccessResponse(updatedUserModel, token, res){
  const parsedUser = updatedUserModel.parse();
  const response = {
    token,
    user: parsedUser
  }
  console.log('post login', response);
  res.json(response);
}

exports.login = login
