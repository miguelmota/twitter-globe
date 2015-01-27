(function(root) {
  'use strict';

  root.App = root.App || {};

  App.twitter = App.twitter || {};

  App.twitter.tweets = App.twitter.tweets || [];
  App.twitter.query = App.twitter.query || (qsparams.get('q') || '@twitter');

  var socket = io.connect('127.0.0.1:8906');
  App.socket = socket;

  socket.on('connect', function() {
    console.log('connected to socket.io');
    initSearch();
  });

  socket.on('twitter:search', function(tweets) {
    console.log('search tweets:', tweets);
    _.each(tweets.statuses, function(tweet, i) {
      _.delay(function() {
        handleTweet(tweet);
      }, 100 * i);
    });
  });

  socket.on('twitter:tweet', handleTweet);

  function initSearch() {
    socket.emit('twitter:search', {q: App.twitter.query, count: 100});
    socket.emit('twitter:track', App.twitter.query);
  }

  function handleTweet(tweet) {
    console.log('tweet', tweet.text);

    //created_at
    //geo.coordinates[0] 1
    // tweet.text

    App.twitter.tweets.push(tweet);

    update();

    var coords = tweet.geo && tweet.geo.coordinates;
    if (coords) {
      plotPoint({
        lat: coords[0],
        lon: coords[1],
        text: tweet.text
      });
    }
  }

  document.addEventListener('twitter:tweetSelected', function(event) {
    var tweet = event.detail;
    console.log('event tweet selected:', tweet);
    if (tweet.geo && tweet.geo.coordinates) {
      var coords = tweet.geo && tweet.geo.coordinates;
      if (coords) {
        earth.panTo(coords, 1);
      }
    }
  });

  document.addEventListener('twitter:queryUpdated', function(event) {
    var q = event.detail.query;
    console.log('event query updated:', q);
    App.twitter.query = q;
    qsparams.set('q', q);
    resetTweets();
    initSearch();
  });

  function resetTweets() {
    App.twitter.tweets = [];
    React.unmountComponentAtNode(document.getElementById('tweets'));
  }

  function update() {
    React.render(React.createElement(TweetList, {tweets: App.twitter.tweets}), document.getElementById('tweets'));
  }
})(window);
