const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  id: String,
  name: String
}, { collection: 'categories' });

const Category = mongoose.model('category', categorySchema);

module.exports.Category = Category;
