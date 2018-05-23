var express = require('express');
var router = express.Router();
var service = require('./service');
var middleware = require('./middleware');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');
var ObjectId = require('mongoose').Types.ObjectId;
const Category = require('./model/Category').Category;
const Ingredient = require('./model/Ingredient').Ingredient;
const Recipe = require('./model/Recipe').Recipe;
const User = require('./model/User').User;
const DefaultResponses = require('./common/DefaultResponses').DefaultResponses;

//logging
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'routes'});

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// get all categories
router.get('/categories', function (req, res) {
  Category.find(function (err, categories) {
    if (err) return console.error(err);
    res.json(categories);
  })
})

// get all ingredients
router.get('/ingredients', function (req, res) {
  Ingredient.find(function (err, categories) {
    if (err) return console.error(err);
    res.json(categories);
  })
})

//save ingredients
router.put('/ingredients', function (req, res) {
  const ingredient = new Ingredient(req.body);
  ingredient.save(function (err, ingredient) {
    if (err) return console.error(err);
    res.json(ingredient);
  })
})

// get all recipes
router.get('/recipes', function (req, res) {
  Recipe.find(function (err, recipes) {
    if (err) return console.error(err);
    res.json(recipes);
  })
})

//save recipe
router.put('/recipes', function (req, res) {
  const recipe = new Recipe(req.body);
  recipe.save(function (err, recipe) {
    if (err) return console.error(err);
    res.json(recipe);
  })
})

// get all users
router.get('/users', function (req, res) {
  //User.findById('5b05c556a04b997a8479e9eb',function (err, users) {
  User.find({username: 'test', password: 'e10adc3949ba59abbe56e057f20f883e'}, function (err, users) {
    if (err) return console.error(err);
    /*var parsedUsers = []
    users.forEach((user, index) => {
        parsedUsers.push(user.parse())
    });*/
    res.json(users);
  })
})

//login a user by username and password
router.post('/login', function (req, res) {
  const body = req.body;
  log.info('post login', body);
  if(!body.username || !body.password) {
    const errorResponse = DefaultResponses.invalidCredentials
    log.error(body, errorResponse)
    res.json(errorResponse)
    return;
  }
  User.findOne({username: body.username, password: body.password}, function (err, user) {
    if (err) {
      const errorResponse = DefaultResponses.unHandledError
      log.error(err, errorResponse)
      res.json(errorResponse)
      return;
    }
    if (!user) {
      const errorResponse = DefaultResponses.userNotFound
      log.error(errorResponse)
      res.json(errorResponse)
      return
    }
    checkTokenAndUpdatIfNeeded(user, res);
  })
})

function checkTokenAndUpdatIfNeeded(userModel, res) {
  const validToken = userModel.validToken;
  if(validToken){
    var payload = jwt.decode(validToken, config.TOKEN_SECRET);

    if(payload.exp <= moment().unix()) {
       return res
        .status(401)
          .send({message: "El token ha expirado"});
    }
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
      log.error(err, errorResponse)
      res.json(errorResponse)
      return;
    }
    if (!updatedUser) {
      const errorResponse = DefaultResponses.userNotFound
      log.error(errorResponse)
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
  log.info('post login', response);
  res.json(response);
}

router.post('/private',
  middleware.ensureAuthenticated,
  function(req, res) {
    res.json({body: req.body, userId: req.userId})
  }
);


module.exports = router
