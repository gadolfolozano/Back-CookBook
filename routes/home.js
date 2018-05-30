const { Category } = require('../model/Category');
const { DefaultResponses } = require('../common/DefaultResponses');

// obtain the home screen, so for now it send the categories
function getDashboard(req, res) {
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

    return res.json({
      user: req.user,
      categories: parsedCategories,
    });
  });
}


exports.getDashboard = getDashboard;
