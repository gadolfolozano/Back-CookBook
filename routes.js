var express = require('express');
var router = express.Router();
var service = require('./service');
var middleware = require('./middleware');
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
  User.find(function (err, users) {
    if (err) return console.error(err);
    var parsedUsers = []
    users.forEach((user, index) => {
        parsedUsers.push(user.parse())
    });
    res.json(parsedUsers);
  })
})

//login a user by username and password
router.post('/login', function (req, res) {
  const body = req.body;
  log.info('post login', body);
  var reqUser = new User().toSchema(body);
  if(!reqUser.validateToLogin()) {
    const errorResponse = DefaultResponses.invalidCredentials
    log.error(body, errorResponse)
    res.json(errorResponse)
    return;
  }
  User.findOne(reqUser, function (err, user) {
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

    const parsedUser = user.parse();
    const response = {
      token: service.createToken(user.id),
      user: parsedUser
    }
    log.info('post login', response);
    res.json(response);
  })
})

router.post('/private',
  middleware.ensureAuthenticated,
  function(req, res) {
    res.json({body: req.body, userId: req.userId})
  }
);


module.exports = router
