var middleware = require('./middleware');
const Category = require('../model/Category').Category;
const DefaultResponses = require('../common/DefaultResponses').DefaultResponses;

//obtain the home screen, so for now it send the categories
function getDashboard(req, res) {
  Category.find(function (err, categories) {
    if (err) {
      const errorResponse = DefaultResponses.unHandledError
      console.log(err, errorResponse)
      res.json(errorResponse)
      return;
    }
    var parsedCategories = []
    categories.forEach((category, index) => {
        parsedCategories.push(category.parse())
    });
    res.json({
      user: req.user,
      categories: parsedCategories
    });
  })
}


exports.getDashboard = getDashboard
