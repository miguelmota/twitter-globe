var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var moment = require('moment');
var argv = require('minimist')(process.argv.slice(2));
var twitter = require('twit');
var http = require('http');
var express = require('express');
var app  = express();

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var config = require(path.resolve(__dirname + '/../config/config.json'));

var T = (new twitter(config.twitter));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var server = http.Server(app);

var rooms = {};

var io = require('socket.io')(server);
io.sockets.on('connection', function (socket){
  console.log('connected');

  var twitterStream;

  socket.on('twitter:track', function(track) {
    //console.log('twitter track:', track);

    if (twitterStream) {
      twitterStream.stop();
    }
    twitterStream = T.stream(
      'statuses/filter',
      {track: track});

    twitterStream.on('tweet', function(tweet) {
      //console.log(tweet);
      socket.emit('twitter:tweet', tweet);
    });

  });

  socket.on('twitter:search', function(query) {
    //console.log('twitter search:', query);
    var opts = {q: query};
    if (_.isObject(query)) {
      opts = query;
    }

    T.get(
      '/search/tweets',
      opts,
      function(err, tweets) {
        if (!err) {
          //console.log(tweets);
          socket.emit('twitter:search', tweets);
        } else {
          console.error(err);
        }
      });
  });

});

server.listen(8906);
