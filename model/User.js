const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: String,
  name: String,
  password: String
}, { collection: 'users' });

UserSchema.method('parse', function() {
    var user = this.toObject();
    return {id: user._id, username: user.name};
});

UserSchema.method('toSchema', function(parsed) {
    return new User({
      name: parsed.username,
      password: parsed.password
    });
});

UserSchema.method('validateToLogin', function() {
    var user = this.toObject();
    return user && user.name && user.password;
});


const User = mongoose.model('User', UserSchema);

module.exports.User = User;
