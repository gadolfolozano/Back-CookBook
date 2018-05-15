const express = require('express')
const app = express()
var routes = require('./routes')
const Category = require('./model/Category').Category;

//connecting database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cookBookDataBase');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('DB connected successfully!');

  initDataBaseIfNeeded();
});

function initDataBaseIfNeeded() {

    db.dropCollection('categories', function(err, result) {
      console.error(result);
      const categories = [
        {id: 1001, name: 'pastas'},
        {id: 1002, name: 'deserts'},
        {id: 1003, name: 'meats'}
      ];

      Category.insertMany(categories, function (err, categories) {
        console.error(categories);
      })
    });
}

app.use(express.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/v1', routes);

app.listen(3009, () => console.log('Example app listening on port 3000!'));
