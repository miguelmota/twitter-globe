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
  locationClick: function(event) {
    var evt = new CustomEvent('earth:panTo:tweet', this.props.tweet);
    document.dispatchEvent(evt);
  },

  render: function() {
    var tweet = this.props.tweet;
    var mapMarker;
    if (tweet.geo && tweet.geo.coordinates) {
      mapMarker = React.createElement("a", {className: "fa fa-map-marker map-marker", onClick: this.locationClick})
    }

    return (
      React.createElement("li", {className: "show"}, 
      React.createElement("a", {href: 'https://twitter.com/' + tweet.user.screen_name, target: "_blank"}, React.createElement("img", {src: tweet.user.profile_image_url})), 
      React.createElement("a", {href: 'https://twitter.com/' + tweet.user.screen_name, target: "_blank", className: "screen-name"}, "@", tweet.user.screen_name, ": "), 
      React.createElement("span", {className: "text", dangerouslySetInnerHTML: {__html: linkify(tweet.text) + ' '}}), 
      React.createElement("a", {href: 'https://twitter.com/statuses/' + tweet.id_str, target: "_blank", className: "datetime"}, tweet.created_at), 
      mapMarker
      )
    );
  }
});

React.render(React.createElement(TweetList, {tweets: tweets}), document.getElementById('tweets'));
