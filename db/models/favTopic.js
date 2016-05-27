var db = require('../config');

var FavTopic = bookshelf.Model.extend({
  tableName: 'user_favs',
  user() {
    return this.belongsTo(User);
  },
  topics() {
    return this.hasMany(Topic);
  }
});