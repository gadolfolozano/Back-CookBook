const express = require('express')
const app = express()
var routes = require('./routes')
const Category = require('./model/Category').Category;
const DefaultResponses = require('./common/DefaultResponses').DefaultResponses;

//logging
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'app'});

//connecting database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cookBookDataBase');
var db = mongoose.connection;
db.on('error', function() {
  log.error('DB connection error');
});
db.once('open', function() {
  // we're connected!
  log.info('DB connected successfully!');
  initDataBaseIfNeeded();
});

function initDataBaseIfNeeded() {

    db.dropCollection('categories', function(err, result) {
      const categories = [
        {id: 1001, name: 'pastas'},
        {id: 1002, name: 'deserts'},
        {id: 1003, name: 'meats'}
      ];

      Category.insertMany(categories, function (err, categories) {

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

//Handling server error
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const messageError = err.status === 404 ? DefaultResponses.notFound : DefaultResponses.unHandledError
  log.error(messageError)
  res.json(messageError);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
