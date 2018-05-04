var express = require('express');
var router = express.Router();
const Category = require('./model').Category;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the categories route
router.get('/categories', function (req, res) {
  Category.find(function (err, categories) {
    if (err) return console.error(err);
    res.send(categories);
  })
  //res.send('return all categories :)')
})

module.exports = router
