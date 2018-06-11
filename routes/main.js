const express = require('express');
const middleware = require('./middleware');
const { Category } = require('../model/Category');
const { Recipe } = require('../model/Recipe');
const auth = require('./auth');
const home = require('./home');
const recipes = require('./recipes');

const router = express.Router();

// get all categories
router.get('/categories', (req, res) => {
  Category.find((err, categories) => {
    if (err) return console.error(err);
    return res.json(categories);
  });
});

// get all recipes
router.get('/recipes', (req, res) => {
  Recipe.find((err, categories) => {
    if (err) return console.error(err);
    const parsedRecipes = [];
    categories.forEach((recipe) => {
      parsedRecipes.push(recipe.parse());
    });
    return res.json(parsedRecipes);
  });
});

// login a user by username and password
router.post('/login', auth.login);
// logOut
router.post('/logout', middleware.ensureAuthenticated, auth.logout);

// login the dasborad of an authenticated user
router.post('/getDashboard', middleware.ensureAuthenticated, home.getDashboard);
router.put('/recipe', middleware.ensureAuthenticated, recipes.saveRecipe);
router.delete('/recipe', middleware.ensureAuthenticated, recipes.removeRecipe);


module.exports = router;
