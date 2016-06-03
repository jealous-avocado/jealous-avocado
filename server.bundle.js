/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var express = __webpack_require__(1);
	var bodyParser = __webpack_require__(2);
	var _ = __webpack_require__(3);
	var request = __webpack_require__(4);
	var bodyParser = __webpack_require__(2);
	var session = __webpack_require__(5);
	var app = express();
	
	var server = __webpack_require__(6).Server(app);
	
	var PORT = process.env.PORT || 3000;
	var db = __webpack_require__(7);
	var User = __webpack_require__(10);
	
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	
	app.use(bodyParser.json());
	
	app.use(express.static(__dirname + '/public')); //express static will serve up index.html by default upon requesting root url
	
	app.post('/signin', function (req, res) {
	  var username = req.body.username;
	  var password = req.body.password;
	  console.log(username, password);
	  new User({ name: username }).fetch().then(function (user) {
	    if (!user) {
	      // var newUser = new User({
	      //   name: username,
	      //   password: password
	      // });
	      // newUser.save();
	      res.status(404);
	      res.end();
	    } else {
	      // console.log(user);
	      res.status(201);
	      res.end();
	    }
	  });
	  res.status(201);
	  res.end();
	});
	
	app.get('/signout', function (req, res) {
	  //destory session
	  res.redirect('/');
	});
	
	app.get('/getArticles', function (req, res) {
	  console.log(req.query, 'url');
	  //
	  res.end();
	});
	
	app.get('*', function (req, res) {
	  res.sendFile(__dirname + '/public/index.html');
	});
	
	app.listen(PORT, function () {
	  console.log('Express listening on port ' + PORT + '!');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("underscore");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var knex = __webpack_require__(8)({
	  // >>>>> Heroku Postgres DB
	
	  // client: 'pg',
	  // connection: process.env.DATABASE_URL
	
	  // >>>>> Local DB 
	
	  client: 'mysql',
	  connection: {
	    host: '127.0.0.1',
	    user: 'root',
	    database: 'rep',
	    charset: 'utf8'
	  }
	});
	
	var db = __webpack_require__(9)(knex);
	
	db.knex.schema.hasTable('users').then(function (exists) {
	  if (!exists) {
	    db.knex.schema.createTable('users', function (user) {
	      user.increments('id').primary();
	      user.string('name', 100).unique();
	      user.string('password', 100);
	      user.timestamps();
	    }).then(function (table) {
	      console.log('Created Table', table);
	    });
	  }
	});
	
	db.knex.schema.hasTable('topics').then(function (exists) {
	  if (!exists) {
	    db.knex.schema.createTable('topics', function (topic) {
	      topic.increments('id').primary();
	      topic.string('name', 255).unique();
	      topic.timestamps();
	    }).then(function (table) {
	      console.log('Created Table', table);
	    });
	  }
	});
	
	db.knex.schema.hasTable('videos').then(function (exists) {
	  if (!exists) {
	    db.knex.schema.createTable('videos', function (video) {
	      video.increments('id').primary();
	      video.string('title', 255);
	      video.string('url', 255);
	      video.integer('userId');
	      video.integer('topicId');
	      video.timestamps();
	    }).then(function (table) {
	      console.log('Created Table', table);
	    });
	  }
	});
	
	db.knex.schema.hasTable('streams').then(function (exists) {
	  if (!exists) {
	    db.knex.schema.createTable('streams', function (stream) {
	      stream.increments('id').primary();
	      stream.string('title', 255);
	      stream.string('url', 255);
	      stream.integer('userId');
	      stream.integer('topicId');
	      stream.timestamps();
	    }).then(function (table) {
	      console.log('Created Table', table);
	    });
	  }
	});
	
	db.knex.schema.hasTable('userFavs').then(function (exists) {
	  if (!exists) {
	    db.knex.schema.createTable('userFavs', function (userFav) {
	      userFav.increments('id').primary();
	      userFav.integer('userId');
	      userFav.integer('topicId');
	      userFav.timestamps();
	    }).then(function (table) {
	      console.log('Created Table', table);
	    });
	  }
	});
	
	db.knex.schema.hasTable('userTopics').then(function (exists) {
	  if (!exists) {
	    db.knex.schema.createTable('userTopics', function (userTopic) {
	      userTopic.increments('id').primary();
	      userTopic.integer('userId');
	      userTopic.integer('topicId');
	      userTopic.timestamps();
	    }).then(function (table) {
	      console.log('Created Table', table);
	    });
	  }
	});
	
	module.exports = db;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("knex");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("bookshelf");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var db = __webpack_require__(7);
	
	var User = db.Model.extend({
	  tableName: 'users',
	  streams: function streams() {
	    return this.hasMany(Stream);
	  },
	  videos: function videos() {
	    return this.hasMany(Video);
	  }
	});
	
	module.exports = User;
	
	//Add password hashing with bcrypt, etc

/***/ }
/******/ ]);
//# sourceMappingURL=server.bundle.js.map