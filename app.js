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

  var kittySchema = mongoose.Schema({
    name: String
  });

  kittySchema.methods.speak = function () {
  var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }

  var Kitten = mongoose.model('Kitten', kittySchema);

  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"

  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

  silence.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })

});

app.use(express.json());
app.use('/v1', routes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
