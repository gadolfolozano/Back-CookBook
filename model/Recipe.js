const mongoose = require('mongoose');

const rankSchema = mongoose.Schema({
  user: String,
  comment: String,
  //TODO limit 1-5 stars
  stars: { type: Number, default: 1 }
});

const recipeSchema = mongoose.Schema({
  name: String,
  description: String,
  ranks: [rankSchema]
}, { collection: 'recipes' });

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports.Recipe = Recipe;
