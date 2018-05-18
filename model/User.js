const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: String,
  username: String,
  password: String
}, { collection: 'users' });

UserSchema.method('parse', function() {
    var user = this.toObject();
    return {id: user._id, username: user.username};
});

UserSchema.method('toSchema', function(parsed) {
    return new User({
      username: parsed.username,
      password: parsed.password
    });
});

UserSchema.method('validateToLogin', function() {
    var user = this.toObject();
    if(user && user.username && user.password) return true;
    return false;
});


const User = mongoose.model('User', UserSchema);

module.exports.User = User;
