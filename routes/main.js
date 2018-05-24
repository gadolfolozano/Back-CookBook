var express = require('express');
var router = express.Router();
var middleware = require('./middleware');
const Category = require('../model/Category').Category;
const Ingredient = require('../model/Ingredient').Ingredient;
const Recipe = require('../model/Recipe').Recipe;
const User = require('../model/User').User;
const DefaultResponses = require('../common/DefaultResponses').DefaultResponses;
var auth = require('./auth');

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
router.post('/login', auth.login)

router.post('/private',
  middleware.ensureAuthenticated,
  function(req, res) {
    res.json({body: req.body, userId: req.userId})
  }
);


module.exports = router
