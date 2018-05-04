var express = require('express');
var router = express.Router();
const Category = require('./model/Category').Category;
const Ingredient = require('./model/Ingredient').Ingredient;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the categories route
router.get('/categories', function (req, res) {
  Category.find(function (err, categories) {
    if (err) return console.error(err);
    res.json(categories);
  })
})

// define the categories route
router.get('/ingredients', function (req, res) {
  Ingredient.find(function (err, categories) {
    if (err) return console.error(err);
    res.json(categories);
  })
})

router.put('/ingredients', function (req, res) {
  const ingredient = new Ingredient(req.body);
  ingredient.save(function (err, ingredient) {
    if (err) return console.error(err);
    res.json(ingredient);
  })
})

module.exports = router
