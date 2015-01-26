var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    return (
      React.createElement("ul", null, 
        "this.props.tweets.map(function(tweet) ", 
          React.createElement(TweetListItem, {tweet: tweet}), 
        ")"
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

React.renderComponent(React.createElement(TweetList, {tweets: tweets}), document.getElementById('tweets'));
