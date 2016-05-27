var db = require('../config');

module.exports.User = db.Model.extend({
  tableName: 'users',
  streams: function() {
    return this.hasMany(Stream);
  },
  videos: function() {
    return this.hasMany(Video);
  }
});


//Add password hashing with bcrypt, etc