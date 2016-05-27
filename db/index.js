var knex = require('knex') ({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'rep',
    charset: 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users',
  streams: function() {
    return this.hasMany(Stream);
  },
  videos: function() {
    return this.hasMany(Video);
  }
});

var Topic = bookshelf.Model.extend({
  tableName: 'topics',
  streams: function() {
    return this.hasMany(Stream);
  },
  videos: function() {
    return this.hasMany(Video);
  }
})

var Video = bookshelf.Model.extend({
  tableName: 'videos',
  user: function() {
    return this.belongsTo(User);
  },
  topic: function() {
    return this.belongsTo(Topic);
  }
});

var Stream = bookshelf.Model.extend({
  tableName: 'streams',
  user: function() {
    return this.belongsTo(User);
  },
  topic: function() {
    return this.belongsTo(Topic);
  }
});

var FavoriteUser = bookshelf.Model.extend({
  tableName: 'user_favs',
  user() {
    return this.belongsTo(User);
  },
  favs() {
    return this.hasMany(User);
  }
});

var FavoriteTopic = bookshelf.Model.extend({
  tableName: 'user_favs',
  user() {
    return this.belongsTo(User);
  },
  topics() {
    return this.hasMany(Topic);
  }
});
