var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {

  },
  streams: function() {
    return this.hasMany(Stream);
  },
  videos: function() {
    return this.hasMany(Video);
  },
  checkPassword: function() {

  },
  hashPassword: function(nonHashedPW) {
    bcrypt.hash(nonHashedPW, null, null, function(err, hash){

    });
  }
});

module.exports = User;


//Add password hashing with bcrypt, etc