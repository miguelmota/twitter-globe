var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    var tweetItems = this.props.tweets.map(function(tweet) {
      return React.createElement(TweetListItem, {tweet: tweet})
    }).reverse()
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
      React.createElement("li", {class: "show"}, 
      React.createElement("a", {href: "", target: "_blank"}, React.createElement("img", {src: this.props.tweet.user.profile_image_url})), 
      React.createElement("span", {class: "screen-name"}, "@", this.props.tweet.user.screen_name, ": "), 
      React.createElement("span", {class: "text"}, this.props.tweet.text)
      )
    );
  }
});

React.render(React.createElement(TweetList, {tweets: tweets}), document.getElementById('tweets'));
