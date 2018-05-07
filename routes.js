var express = require('express');
var router = express.Router();
const Category = require('./model/Category').Category;
const Ingredient = require('./model/Ingredient').Ingredient;
const Recipe = require('./model/Recipe').Recipe;

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


module.exports = router
