var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    var tweetItems = this.props.tweets.map(function(tweet) {
      return React.createElement(TweetListItem, {tweet: tweet})
    })
    return (
      React.createElement("ul", null, 
        tweetItems
      )
    )
  }
});

var tweets = [];

var TweetListItem = React.createClass({displayName: "TweetListItem",
  render: function() {
    return (
      React.createElement("li", null, 
      React.createElement("img", {src: tweet.user.profile_image_url}), 
      React.createElement("span", null, "@", this.props.tweet.user.screen_name), 
      React.createElement("span", null, this.props.tweet.text)
      )
    );
  }
});

React.render(React.createElement(TweetList, {tweets: tweets}), document.getElementById('tweets'));
