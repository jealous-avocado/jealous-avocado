var db = require('../config');

var Topic = db.Model.extend({
  tableName: 'topics',
  hasTimestamps: true,
  streams: function() {
    return this.hasMany(Stream);
  },
  videos: function() {
    return this.hasMany(Video);
  },
  articles: function() {
    return this.hasMany(Article);
  }
})

module.exports = Topic;