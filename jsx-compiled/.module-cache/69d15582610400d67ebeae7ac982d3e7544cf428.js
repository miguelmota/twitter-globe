var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    var tweetItems = this.props.tweets.map(function(tweet) {
      React.createElement(TweetListItem, {tweet: tweet})
    })
    return (
      React.createElement("ul", null, 
        tweetItems
      )
    )
  }
});

var tweets = [{text: 'foo'}];

var TweetListItem = React.createClass({displayName: "TweetListItem",
  render: function() {
    var tweet = this.props.tweet;
    return (
      React.createElement("li", null, tweet.text)
    );
  }
});

React.render(React.createElement(TweetList, {tweets: tweets}), document.getElementById('tweets'));
