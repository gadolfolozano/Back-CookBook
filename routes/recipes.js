const { Category } = require('../model/Category');
const { Recipe } = require('../model/Recipe');
const { DefaultResponses } = require('../common/DefaultResponses');

function handleSave(res, err, recipe) {
  if (err || !recipe) {
    const errorResponse = DefaultResponses.unHandledError;
    res.status(errorResponse.error.errorCode);
    return res.json(errorResponse);
  }

  return res.json({
    recipe: recipe.parse(),
  });
}

function performSave(req, res, recipeId, recipeToSave) {
  if (recipeId) {
    Recipe.findByIdAndUpdate(recipeId, { $set: recipeToSave }, { new: true }, (err, recipe) => {
      handleSave(res, err, recipe);
    });
  } else {
    const recipeModel = new Recipe(recipeToSave);
    recipeModel.save((err, recipe) => {
      handleSave(res, err, recipe);
    });
  }
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

    return performSave(req, res, recipe.id, recipeToSave);
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

function searchRecipes(req, res) {
  const query = req.body.name;
  Recipe.find(
    { $or: [{ name: { $regex: query, $options: 'i' } }, { ingredients: { $regex: query, $options: 'i' } }] },
    (err, recipes) => {
      if (err || !recipes) {
        const errorResponse = DefaultResponses.unHandledError;
        res.status(errorResponse.error.errorCode);
        return res.json(errorResponse);
      }
      const parsedRecipes = [];
      recipes.forEach((recipe) => {
        parsedRecipes.push(recipe.parse());
      });

      return res.json({
        recipes: parsedRecipes,
      });
    },
  );
}

exports.saveRecipe = saveRecipe;
exports.removeRecipe = removeRecipe;
exports.searchRecipes = searchRecipes;
