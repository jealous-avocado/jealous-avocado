var knex = require('knex') ({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'rep',
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);

// Could use knex.schema.createTable to create schema
// instead of using schema.sql

module.exports = db;