const { Category } = require('../model/Category');
const { Recipe } = require('../model/Recipe');
const { DefaultResponses } = require('../common/DefaultResponses');

function getFirstsRecipes(req, res, parsedCategories) {
  Recipe.find((err, recipes) => {
    if (err) {
      const errorResponse = DefaultResponses.unHandledError;
      res.status(errorResponse.error.errorCode);
      return res.json(errorResponse);
    }

    const parsedRecipes = [];
    recipes.forEach((recipe) => {
      parsedRecipes.push(recipe.parse());
    });

    return res.json({
      user: req.user,
      categories: parsedCategories,
      recipes: parsedRecipes,
    });
  });
}

function getCategories(req, res) {
  Category.find((err, categories) => {
    if (err) {
      const errorResponse = DefaultResponses.unHandledError;
      res.status(errorResponse.error.errorCode);
      return res.json(errorResponse);
    }

    const parsedCategories = [];
    categories.forEach((category) => {
      parsedCategories.push(category.parse());
    });

    return getFirstsRecipes(req, res, parsedCategories);
  });
}

// obtain the home screen, so for now it send the categories
function getDashboard(req, res) {
  getCategories(req, res);
}


exports.getDashboard = getDashboard;
