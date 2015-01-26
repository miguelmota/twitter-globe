var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    var tweetItems = this.props.tweets.map(function(tweet) {
      return React.createElement(TweetListItem, {tweet: tweet, key: tweet})
    }).reverse()
    return (
      React.createElement("ul", null, 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "example"}, 
        tweetItems
        )
      )
    )
  }
});

var TweetListItem = React.createClass({displayName: "TweetListItem",
  locationClick: function(event) {
    var evt = new CustomEvent('twitter:tweetSelected', {detail: this.props.tweet});
    document.dispatchEvent(evt);
  },

  render: function() {
    var tweet = this.props.tweet;
    var haveGeo = false;
    var mapMarker;
    if (tweet.geo && tweet.geo.coordinates) {
      haveGeo = true;
      mapMarker = React.createElement("a", {className: "fa fa-map-marker map-marker", onClick: this.locationClick})
    }

    var classes = 'show';
    classes += (haveGeo ? ' geo' : '');

    return (
      React.createElement("li", {className: classes}, 
      React.createElement("a", {href: 'https://twitter.com/' + tweet.user.screen_name, target: "_blank"}, React.createElement("img", {src: tweet.user.profile_image_url})), 
      React.createElement("a", {href: 'https://twitter.com/' + tweet.user.screen_name, target: "_blank", className: "screen-name"}, "@", tweet.user.screen_name, ": "), 
      React.createElement("span", {className: "text", dangerouslySetInnerHTML: {__html: linkify(tweet.text) + ' '}}), 
      React.createElement("a", {href: 'https://twitter.com/statuses/' + tweet.id_str, target: "_blank", className: "datetime"}, tweet.created_at), 
      mapMarker
      )
    );
  }
});

var TwitterSearchForm = React.createClass({displayName: "TwitterSearchForm",
  render: function() {
    return (
      React.createElement("form", null, 
      React.createElement("input", {type: "search", placeholder: "query"})
      )
    )
  }
});

var tweets = [];

React.render(React.createElement(TweetList, {tweets: tweets}), document.getElementById('tweets'));
React.render(React.createElement(TwitterSearchForm, {tweets: tweets}), document.getElementById('twitter-search-form'));
