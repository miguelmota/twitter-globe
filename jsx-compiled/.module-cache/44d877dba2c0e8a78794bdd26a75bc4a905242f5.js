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
      React.createElement("li", {className: "show"}, 
      React.createElement("a", {href: 'https://twitter.com/' + this.prop.tweet.user.id_str, target: "_blank"}, React.createElement("img", {src: this.props.tweet.user.profile_image_url})), 
      React.createElement("a", {href: 'https://twitter.com/' + this.prop.tweet.user.id_str, className: "screen-name"}, "@", this.props.tweet.user.screen_name, ": "), 
      React.createElement("span", {className: "text"}, this.props.tweet.text), 
      React.createElement("time", {className: "datetime"}, this.props.tweet.created_at)
      )
    );
  }
});

React.render(React.createElement(TweetList, {tweets: tweets}), document.getElementById('tweets'));
