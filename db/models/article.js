var db = require('../config');

var Article = db.Model.extend({
  tableName: 'articles',
  hasTimestamps: true,
  topic: function() {
    return this.belongsTo(Topic);
  }
})

module.exports = Article;