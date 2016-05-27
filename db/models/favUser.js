var db = require('../config');

var FavUser = bookshelf.Model.extend({
  tableName: 'user_favs',
  user() {
    return this.belongsTo(User);
  },
  favs() {
    return this.hasMany(User);
  }
});
