const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: String
}, { collection: 'categories' });

CategorySchema.method('parse', function() {
    var category = this.toObject();
    return {
      id: category._id,
      name: category.name
    };
});

const Category = mongoose.model('category', CategorySchema);

module.exports.Category = Category;
