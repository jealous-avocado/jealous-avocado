var knex = require('knex') ({
  // >>>>> Heroku Postgres DB

  // client: 'pg',
  // connection: process.env.DATABASE_URL

  // >>>>> Local DB  
  
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'rep', 
    password: 'kk'
  }
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists){
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('name', 100).unique();
      user.string('password', 100);
      user.boolean('isStreaming').defaultTo(false);
      user.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('topics').then(function(exists) {
  if (!exists){
    db.knex.schema.createTable('topics', function (topic) {
      topic.increments('id').primary();
      topic.string('name', 255).unique();
      topic.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('videos').then(function(exists) {
  if (!exists){
    db.knex.schema.createTable('videos', function (video) {
      video.increments('id').primary();
      video.string('title', 255);
      video.string('url', 255);
      video.integer('userId');
      video.integer('topicId');
      video.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('articles').then(function(exists) {
  if (!exists){
    db.knex.schema.createTable('articles', function (article) {
      article.increments('id').primary();
      article.string('title', 255);
      article.string('url', 1024).unique();
      article.integer('topicId');
      article.string('snippet', 3000);
      article.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('userFavs').then(function(exists) {
  if (!exists){
    db.knex.schema.createTable('userFavs', function (userFav) {
      userFav.increments('id').primary();
      userFav.integer('userId');
      userFav.integer('topicId');
      userFav.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('userTopics').then(function(exists) {
  if (!exists){
    db.knex.schema.createTable('userTopics', function (userTopic) {
      userTopic.increments('id').primary();
      userTopic.integer('userId');
      userTopic.integer('topicId');
      userTopic.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;