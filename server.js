var Promise = require('bluebird');
var bodyParser = require('body-parser');
var _ = require('underscore');
var request = require('request-promise');
var bodyParser = require('body-parser')
var session = require('express-session');
var express = require('express');

var app = express();
var server = require('http').Server(app);
var PORT = process.env.PORT || 3000;

var db = require('./db/config');
var User = require('./db/models/user.js');
var Topic = require('./db/models/topic.js');
var Article = require('./db/models/article.js');

var alchemyAPI = require('./alchemy.config.js');

app.use(bodyParser.urlencoded({     
 extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); //express static will serve up index.html by default upon requesting root url

app.post('/signin', function (req, res) {
 var username = req.body.username;
 var password = req.body.password;

 new User({ name: username })
  .fetch()
  .then(function(user) {
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

app.get('/getArticles', (req, res) => {
  const MAX_TIME = 86400000; //Longest time to keep articles in db.  (One day = 86400000ms)
  var allURLS = [];

  //only do an alchemyAPI request if necessary -- if there are cached articles, then show those first
  var refreshArticles = function(topicId) {
    Article.fetchAll({topicId: topicId}).then(function(articles){
      articles.forEach(function(article){
        article.destroy();
      });
    });
    console.log('querying alchemyAPI for articles', req.query.topic);
    request.get(alchemyAPI.getNewsURL(req.query.topic))
    .then(d => {
      d = JSON.parse(d);
      d.result.docs.forEach(doc => {
        var newArticle = new Article({
          url: doc.source.enriched.url.url,
          topicId: topicId
        }).save();
      });
      getArticles(topicId);
    });
  };

  //get the articles from the db
  var getArticles = function(topicId) {
    Article.fetchAll({topicId: topicId}).then(function(articles){
      articles.forEach(function(article){
        //console.log(article.get('url'), article.get('created_at'));
        allURLS.push(article.get('url'));
      });
      res.json(allURLS);
    });
  };

  //2. Are there any articles in the db? How recently were they added?
  var checkArticleAge = function(topicId) {
    new Article({topicId: topicId}).fetch().then(function(article){
      if(article){
        //console.log('oldest article', article.get('created_at'));
        if(new Date - Date.parse(article.get('created_at')) > MAX_TIME) {
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
  }

  //1. does this topic exist in the topics table?
  new Topic({name:req.query.topic})
    .fetch()
    .then(function(topic) {
      if (!topic) {
        var reqTopic = new Topic({name:req.query.topic})
        reqTopic.save().then(function(topic){
          checkArticleAge(topic.get('id'));
        });
      } else {
        checkArticleAge(topic.get('id'));
      }
    });
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function () {
 console.log('Express listening on port ' + PORT + '!');
});
