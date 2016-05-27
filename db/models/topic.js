var db = require('../config');

var Topic = bookshelf.Model.extend({
  tableName: 'topics',
  streams: function() {
    return this.hasMany(Stream);
  },
  videos: function() {
    return this.hasMany(Video);
  }
})