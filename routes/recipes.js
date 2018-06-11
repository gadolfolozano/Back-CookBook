const { Category } = require('../model/Category');
const { Recipe } = require('../model/Recipe');
const { DefaultResponses } = require('../common/DefaultResponses');

function performSave(req, res, recipeToSave) {
  const recipeModel = new Recipe(recipeToSave);
  recipeModel.save((err, recipe) => {
    if (err || !recipe) {
      const errorResponse = DefaultResponses.unHandledError;
      res.status(errorResponse.error.errorCode);
      return res.json(errorResponse);
    }

    return res.json({
      recipe: recipe.parse(),
    });
  });
}

function saveRecipe(req, res) {
  const { recipe } = req.body;
  Category.findOne({ _id: recipe.category.id }, (err, category) => {
    if (err || !category) {
      const errorResponse = DefaultResponses.unHandledError;
      res.status(errorResponse.error.errorCode);
      return res.json(errorResponse);
    }

    const parsedCategory = category.parse();

    const recipeToSave = {
      name: recipe.name,
      description: recipe.description,
      rank: recipe.rank,
      category: parsedCategory,
      ingredients: recipe.ingredients,
    };

    return performSave(req, res, recipeToSave);
  });
}

function removeRecipe(req, res) {
  const { recipe } = req.body;
  Recipe.findOneAndRemove({ _id: recipe.id }, (err) => {
    if (err) {
      const errorResponse = DefaultResponses.unHandledError;
      res.status(errorResponse.error.errorCode);
      return res.json(errorResponse);
    }
    return res.json({
      removedId: recipe.id,
    });
  });
}

exports.saveRecipe = saveRecipe;
exports.removeRecipe = removeRecipe;
