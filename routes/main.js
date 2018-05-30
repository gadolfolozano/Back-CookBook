var express = require('express');
var router = express.Router();
var middleware = require('./middleware');
const Category = require('../model/Category').Category;
const Recipe = require('../model/Recipe').Recipe;
const DefaultResponses = require('../common/DefaultResponses').DefaultResponses;
var auth = require('./auth');
var home = require('./home');

//logging
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'routes'});

// get all categories
router.get('/categories', function (req, res) {
  Category.find(function (err, categories) {
    if (err) return console.error(err);
    res.json(categories);
  })
})

// get all recipes
router.get('/recipes', function (req, res) {
  Recipe.find(function (err, categories) {
    if (err) return console.error(err);
    var parsedRecipes = []
    categories.forEach((recipe, index) => {
        parsedRecipes.push(recipe.parse())
    });
    res.json(parsedRecipes);
  })
})

//login a user by username and password
router.post('/login', auth.login)
//logOut
router.post('/logout', middleware.ensureAuthenticated, auth.logout)

//login the dasborad of an authenticated user
router.post('/getDashboard', middleware.ensureAuthenticated , home.getDashboard)



module.exports = router
