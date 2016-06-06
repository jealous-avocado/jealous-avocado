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
	
	var Promise = __webpack_require__(1);
	var bodyParser = __webpack_require__(2);
	var _ = __webpack_require__(3);
	var request = __webpack_require__(4);
	var bodyParser = __webpack_require__(2);
	var session = __webpack_require__(5);
	var knexSessionStore = __webpack_require__(6)(session);
	var express = __webpack_require__(7);
	
	var app = express();
	var server = __webpack_require__(8).Server(app);
	var PORT = process.env.PORT || 3000;
	
	var db = __webpack_require__(9);
	var User = __webpack_require__(12);
	var bcrypt = __webpack_require__(13);
	var Topic = __webpack_require__(14);
	var Article = __webpack_require__(15);
	
	var alchemyAPI = __webpack_require__(16);
	
	var sessionStore = new knexSessionStore({
	  knex: db.knex,
	  tablename: 'sessions'
	});
	
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/public')); //express static will serve up index.html by default upon requesting root url
	
	app.use(session({
	  secret: 'secret',
	  resave: false,
	  saveUninitialized: true,
	  cookie: {
	    maxAge: 1000 * 60 * 60 * 24 * 7 //1 week
	  },
	  store: sessionStore
	}));
	
	app.post('/signup', function (req, res) {
	  var username = req.body.username;
	  var password = req.body.password;
	  new User({ name: username }).fetch().then(function (user) {
	    if (user) {
	      res.status(403);
	      res.end('A user with that name already exists!');
	    } else {
	      bcrypt.hash(password, null, null, function (err, hash) {
	        var newUser = new User({
	          name: username,
	          password: hash
	        });
	        newUser.save();
	        res.status(304);
	        res.end();
	      });
	    }
	  });
	});
	
	app.post('/signin', function (req, res) {
	  var username = req.body.username;
	  var password = req.body.password;
	
	  new User({ name: username }).fetch().then(function (user) {
	    if (!user) {
	      res.status(404);
	      res.end();
	    } else {
	      // console.log(user);
	      user.checkPassword(password, function (isMatch) {
	        if (isMatch) {
	          res.status(201);
	          res.end();
	        } else {
	          res.status(404);
	          res.end();
	        }
	      });
	    }
	  });
	});
	
	app.get('/signout', function (req, res) {
	  //destory session
	  res.redirect('/');
	});
	
	app.get('/currentStreamer', function (req, res) {
	  var streamerList = [];
	
	  User.query({ where: { isStreaming: true } }).fetchAll().then(function (streamers) {
	    streamers.forEach(function (stream) {
	      //console.log(article.get('url'), article.get('created_at'));
	      streamerList.push(stream.get('name'));
	    });
	    res.json(streamerList);
	  });
	});
	
	app.post('/currentStreamer', function (req, res) {
	  var username = req.body.username;
	  var isStreaming = JSON.parse(req.body.isStreaming); //cast bool to int
	  console.log('currentStreamer POST', username, isStreaming);
	  new User({ name: username }).fetch().then(function (user) {
	    if (user) {
	      user.set({ isStreaming: isStreaming }).save();
	      res.end();
	    } else {
	      res.status(404);
	      res.end();
	    }
	  });
	});
	
	app.get('/getArticles', function (req, res) {
	  var MAX_TIME = 86400000; //Longest time to keep articles in db.  (One day = 86400000ms)
	  var allURLS = [];
	  //only do an alchemyAPI request if necessary -- if there are cached articles, then show those first
	  var refreshArticles = function refreshArticles(topicId) {
	    Article.query({ where: { topicId: topicId } }).fetchAll().then(function (articles) {
	      articles.forEach(function (article) {
	        article.destroy();
	      });
	    });
	    console.log('querying alchemyAPI for articles in ', req.query.topic);
	    request.get(alchemyAPI.getNewsURL(req.query.topic)).then(function (d) {
	      d = JSON.parse(d);
	      d.result.docs.forEach(function (doc) {
	        var newArticle = new Article({
	          url: doc.source.enriched.url.url,
	          topicId: topicId
	        }).save();
	      });
	      getArticles(topicId);
	    });
	  };
	
	  //get the articles from the db
	  var getArticles = function getArticles(topicId) {
	    Article.fetchAll({ topicId: topicId }).then(function (articles) {
	      articles.forEach(function (article) {
	        //console.log(article.get('url'), article.get('created_at'));
	        allURLS.push(article.get('url'));
	      });
	      res.json(allURLS);
	    });
	  };
	
	  //2. Are there any articles in the db? How recently were they added?
	  var checkArticleAge = function checkArticleAge(topicId) {
	    new Article({ topicId: topicId }).fetch().then(function (article) {
	      if (article) {
	        //console.log('oldest article', article.get('created_at'));
	        if (new Date() - Date.parse(article.get('created_at')) > MAX_TIME) {
	          //time to update the database with alchemyAPI
	          refreshArticles(topicId);
	        } else {
	          //use articles in database
	          getArticles(topicId);
	        }
	      } else {
	        //need to populate the database with articles for this topic.
	        refreshArticles(topicId);
	      }
	    });
	  };
	
	  //1. does this topic exist in the topics table?
	  new Topic({ name: req.query.topic }).fetch().then(function (topic) {
	    if (!topic) {
	      var reqTopic = new Topic({ name: req.query.topic });
	      reqTopic.save().then(function (topic) {
	        checkArticleAge(topic.get('id'));
	      });
	    } else {
	      checkArticleAge(topic.get('id'));
	    }
	  });
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

	module.exports = require("bluebird");

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

	module.exports = require("request-promise");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("connect-session-knex");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var knex = __webpack_require__(10)({
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
	
	var db = __webpack_require__(11)(knex);
	
	db.knex.schema.hasTable('users').then(function (exists) {
	  if (!exists) {
	    db.knex.schema.createTable('users', function (user) {
	      user.increments('id').primary();
	      user.string('name', 100).unique();
	      user.string('password', 100);
	      user.boolean('isStreaming').defaultTo(false);
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
	
	db.knex.schema.hasTable('articles').then(function (exists) {
	  if (!exists) {
	    db.knex.schema.createTable('articles', function (article) {
	      article.increments('id').primary();
	      //article.string('title', 255);
	      article.string('url', 1024).unique();
	      article.integer('topicId');
	      article.timestamps();
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
/* 10 */
/***/ function(module, exports) {

	module.exports = require("knex");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("bookshelf");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var db = __webpack_require__(9);
	var bcrypt = __webpack_require__(13);
	var Promise = __webpack_require__(1);
	
	var User = db.Model.extend({
	  tableName: 'users',
	  hasTimestamps: true,
	  initialize: function initialize() {},
	  streams: function streams() {
	    return this.hasMany(Stream);
	  },
	  videos: function videos() {
	    return this.hasMany(Video);
	  },
	  checkPassword: function checkPassword(checkPW, callback) {
	    bcrypt.compare(checkPW, this.get('password'), function (err, isMatch) {
	      callback(isMatch);
	    });
	  }
	});
	
	module.exports = User;
	
	//Add password hashing with bcrypt, etc

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("bcrypt-nodejs");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var db = __webpack_require__(9);
	
	var Topic = db.Model.extend({
	  tableName: 'topics',
	  hasTimestamps: true,
	  streams: function streams() {
	    return this.hasMany(Stream);
	  },
	  videos: function videos() {
	    return this.hasMany(Video);
	  },
	  articles: function articles() {
	    return this.hasMany(Article);
	  }
	});
	
	module.exports = Topic;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var db = __webpack_require__(9);
	
	var Article = db.Model.extend({
	  tableName: 'articles',
	  hasTimestamps: true,
	  topic: function topic() {
	    return this.belongsTo(Topic);
	  }
	});
	
	module.exports = Article;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  API_KEY: 'YOUR_ALCHEMY_API_KEY',
	  getNewsURL: function getNewsURL(topic) {
	    return 'https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=50\n    &apikey=' + undefined[API_KEY] + '&return=enriched.url.url&q.enriched.url.concepts.concept.text=' + topic;
	  },
	
	  getTextURL: function getTextURL(link) {
	    return 'http://gateway-a.watsonplatform.net/calls/url/URLGetText\n    ?apikey=' + undefined[API_KEY] + '\n    &outputMode=json\n    &url=' + link;
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=server.bundle.js.map