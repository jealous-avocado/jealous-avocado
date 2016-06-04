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
  var allURLS = [];

  //only do a request if necessary -- if there are cached articles, then show those first
  request.get(alchemyAPI.getNewsURL(req.query.topic))
    .then(d => {
      /*
      d = JSON.parse(d);
      d.result.docs.forEach(doc => {
        allURLS.push(doc.source.enriched.url.url);
      });
      */
    });
    
  
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function () {
 console.log('Express listening on port ' + PORT + '!');
});
