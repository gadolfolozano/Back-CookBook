const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  validToken: String
}, { collection: 'users' });

UserSchema.method('parse', function() {
    var user = this.toObject();
    return {
      id: user._id,
      username: user.username
    };
});

UserSchema.method('validateToLogin', function() {
    var user = this.toObject();
    if(user && user.username && user.password) return true;
    return false;
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;
