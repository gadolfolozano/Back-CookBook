const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
  id: String,
  name: String
}, { collection: 'ingredients' });

const Ingredient = mongoose.model('ingredient', ingredientSchema);

module.exports.Ingredient = Ingredient;
