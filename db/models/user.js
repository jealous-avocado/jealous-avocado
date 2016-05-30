var db = require('../config');

var User = db.Model.extend({
  tableName: 'users',
  streams: function() {
    return this.hasMany(Stream);
  },
  videos: function() {
    return this.hasMany(Video);
  }
});

module.exports = User;


//Add password hashing with bcrypt, etc