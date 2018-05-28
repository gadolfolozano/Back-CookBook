var assert = require('assert');
const User = require('../model/User').User;

describe('User', function() {
  describe('#parse()', function() {
    it('should return the parsed id', function() {
      var user = new User();
      assert.equal(user.parse().id.toString(), user._id.toString());
    });

    it('should return the parsed username', function() {
      assert.equal(new User({username: 'user'}).parse().username, 'user');
    });
  });

  describe('#validateToLogin()', function() {
    it('should return true when the username and password are setted ', function() {
      assert.equal(new User({username: 'user', password: '123456'}).validateToLogin(), true);
    });
    it('should return false when only the username is setted ', function() {
    assert.equal(new User({username: 'user'}).validateToLogin(), false);
    });
    it('should return false when only the password is setted ', function() {
      assert.equal(new User({password: '123456'}).validateToLogin(), false);
    });
    it('should return false when no field is setted ', function() {
      assert.equal(new User().validateToLogin(), false);
    });
  });
});
