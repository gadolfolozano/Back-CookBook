const express = require('express')
const app = express()
var routes = require('./routes')

//connecting database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cookBookDataBase');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('DB connected successfully!');
});

app.use(express.json());
app.use('/v1', routes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
