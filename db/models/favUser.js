var db = require('../config');

var FavUser = bookshelf.Model.extend({
  tableName: 'userFavs',
  user() {
    return this.belongsTo(User);
  },
  favs() {
    return this.hasMany(User);
  }
});
