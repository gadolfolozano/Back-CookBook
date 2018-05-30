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


var request = require('supertest');
describe('loading express', function () {
  var server;
  var token = null;
  beforeEach(function () {
    //server = require('./server');
    server = require('../app');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /v1/categories', function testSlash(done) {
    this.timeout(10000);
    request(server)
      .get('/v1/categories')
      .expect(200, done);
  });
  it('responds to /v1/recipes', function testSlash(done) {
    this.timeout(10000);
    request(server)
      .get('/v1/recipes')
      .expect(200, function(err, res) {
        console.log('res recipes ',  res.body);
        done()
      });
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
  it('responds Unauthorized to /v1/getDashboard', function testSlash(done) {
    this.timeout(10000);
    request(server)
      .post('/v1/getDashboard')
      .expect(401, done);
  });
  it('responds Bad Request to /v1/login', function testSlash(done) {
    this.timeout(10000);
    request(server)
      .post('/v1/login')
      .expect(400, done);
  });
  it('responds success to /v1/login', function testSlash(done) {
    this.timeout(10000);
    request(server)
      .post('/v1/login')
      .set('Content-Type', 'application/json')
      .send({
        "username": "test",
        "password": "e10adc3949ba59abbe56e057f20f883e"
      })
      .expect(200, function(err, res) {
        token = res.body.token;
        done()
      });
  });
  it('responds success to /v1/getDashboard', function testSlash(done) {
    this.timeout(10000);
    request(server)
      .post('/v1/getDashboard')
      .set('Content-Type', 'application/json')
      .send({
        "token": token
      })
      .expect(200, function(err, res) {
        done()
      });
  });


});
