const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  name: String,
  category: {
    id: String,
    name: String,
  },
  description: String,
  cheffName: String,
  rank: Number,
  ingredients: [String],
}, { collection: 'recipes' });

RecipeSchema.method('parse', function parse() {
  const recipe = this.toObject();
  return {
    id: recipe._id,
    name: recipe.name,
    description: recipe.description,
    rank: recipe.rank,
    ingredients: recipe.ingredients,
    cheffName: recipe.cheffName,
    category: recipe.category,
  };
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports.Recipe = Recipe;
