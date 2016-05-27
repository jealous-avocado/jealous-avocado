var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var request = require('request');
var bodyParser = require('body-parser')
var session = require('express-session');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({     
 extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
 res.render('index.html');
});

app.post('/signin', function (req, res) {
 var username = req.body.username;
 var password = req.body.password;

 new User({ username: username })
  .fetch()
  .then(function(user) {
    if (!user) {
      res.redirect('/signin');
    } else {
      res.end();
    }
  });
});

app.get('/signout', function (req, res) {
 //destory session 
 res.redirect('/');
});


app.listen(PORT, function () {
 console.log('Express listening on port ' + PORT + '!');
});