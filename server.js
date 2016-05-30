var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var request = require('request');
var bodyParser = require('body-parser')
var session = require('express-session');
var app = express();

var server = require('http').Server(app);


var PORT = process.env.PORT || 3000;
var db = require('./db/config');
var User = require('./db/models/user.js');

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
 new User({ name: username })
  .fetch()
  .then(function(user) {
    if (!user) {
      // res.redirect('/signin');
      res.end();
    } else {
      res.end();
    }
  });
});

app.get('/signout', function (req, res) {
 //destory session 
 res.redirect('/');
});

require('./WebRTC_Scalable_Broadcast.js')(server);

// var io = require('socket.io')(server);
// io.on('connection', () => { console.log('connnected!@#!@#!@!##!');});

server.listen(PORT, function () {
 console.log('Express listening on port ' + PORT + '!');
});
