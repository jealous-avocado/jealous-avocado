var WebRTC_Scalable_Broadcast = function(app) {
  var io = require('socket.io')(app);

  io.set('transports', [
         'websocket', 
         'xhr-polling', 
         'jsonp-polling',
         'polling'
    ]);

  var listofBroadcasts = {};

  io.on('connection', (socket) => {
    var currentUser;
    socket.on('joinBroadcast', (user) => {
      currentUser = user;

      //console.log(currentUser, '******* CUrrent User ***** ');


      user.numberofViewers = 0;

      if (!listofBroadcasts[user.bcastID]) {
        listofBroadcasts[user.bcastID] = {
          broadcasters: {}, 
          allUsers: {}, 
          typeOfStreams: user.typeOfStreams
        };
      }

      var firstAvailableBroadcaster = getFirstAvailableBroadcaster(user);

      if (firstAvailableBroadcaster) {
        listofBroadcasts[user.bcastID].broadcasters[firstAvailableBroadcaster.userid].numberofViewers++;
        socket.emit('joinStreamer', firstAvailableBroadcaster, listofBroadcasts[user.bcastID].typeOfStreams);

        console.log(user.userid, ' <<< ', firstAvailableBroadcaster.userid);
      } else {
        currentUser.isInitator = true;
        socket.emit('startBroadcast', listofBroadcasts[user.bcastID].typeOfStreams);
        console.log(user.userid, ' >>> (started streaming)');
      }

      listofBroadcasts[user.bcastID].broadcasters[user.userid] = user;

      listofBroadcasts[user.bcastID].allUsers[user.userid] = user;
    });

    socket.on('video', (video) => {
      socket.broadcast.emit('video', video);
    });

    socket.on('disconnet', () => {
      if (!currentUser) return;
      if (!listofBroadcasts[currentUser.bcastID]) return;
      if (!listofBroadcasts[currentUser.bcastID].broadcasters[currentUser.userid]) return;


      delete listofBroadcasts[currentUser.bcastID].broadcasters[currentUser.userid];

      if (currentUser.isInitator) {
        delete listofBroadcasts[currentUser.bcastID];
      }
    });

  });

  var getFirstAvailableBroadcaster = function(user) {
    var broadcasters = listofBroadcasts[user.bcastID].broadcasters;
    var first; 

    for (var userid in broadcasters) {
      if (broadcasters[userid].numberofViewers <= 3) {
        first = broadcasters[userid];
        break; //continue;
      } else {
        delete listofBroadcasts[user.bcastID].broadcasters[userid];
      }
    }

    return first;

  };
  
};

module.exports = WebRTC_Scalable_Broadcast;
