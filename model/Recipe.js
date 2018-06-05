const mongoose = require('mongoose');
const { Category } = require('./Category');

const RecipeSchema = mongoose.Schema({
  name: String,
  category: Category.schema,
  description: String,
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
    category: new Category(recipe.category).parse(),
  };
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports.Recipe = Recipe;
