const mongoose = require('mongoose');
const Category = require('./Category').Category;

const RecipeSchema = mongoose.Schema({
  name: String,
  category: Category.schema,
  description: String,
  rank: Number
}, { collection: 'recipes' });

RecipeSchema.method('parse', function() {
    var recipe = this.toObject();
    return {
      id: recipe._id,
      description: recipe.name,
      rank: recipe.rank,
      category: new Category(recipe.category).parse()
    };
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports.Recipe = Recipe;
