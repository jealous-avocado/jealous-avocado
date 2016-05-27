var db = require('../config');

var FavTopic = bookshelf.Model.extend({
  tableName: 'userTopics',
  user() {
    return this.belongsTo(User);
  },
  topics() {
    return this.hasMany(Topic);
  }
});