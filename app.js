const express = require('express')
const app = express()
var routes = require('./routes/main')
var config = require('./config')
const DefaultResponses = require('./common/DefaultResponses').DefaultResponses;

//logging
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'app'});

//connecting database
var mongoose = require('mongoose');
mongoose.connect(config.DATA_BASE_URI);
var db = mongoose.connection;
db.on('error', function() {
  log.error('DB connection error');
});
db.once('open', function() {
  // we're connected!
  log.info('DB connected successfully!');
});

app.use(express.json());

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');
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
  const messageError = getErrorMessage(err.status)
  log.error(messageError)
  res.json(messageError);
});

function getErrorMessage(status) {
  switch (status) {
    case 400:
      return DefaultResponses.badRequest;
    case 404:
      return DefaultResponses.notFound;
    default:
      return DefaultResponses.unHandledError;
  }
}

const port = 3000;
var server = app.listen(port, () => console.log('Example app listening on port ' + port + "'!'" ));
module.exports = server;
