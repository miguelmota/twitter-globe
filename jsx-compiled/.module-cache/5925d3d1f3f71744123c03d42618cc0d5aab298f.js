var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    return (
      React.createElement("ul", null, 
        React.createElement(TweetListItem, null)
      )
    )
  }
});

var tweets = [{text: 'foo'}];

var TweetListItem = React.createClass({displayName: "TweetListItem",
  render: function() {
    return (
      this.props.tweets.map(function(tweet) {
        return React.createElement("li", null, tweet.text);
      })
    );
  }
});

React.renderComponent(React.createElement(TweetList, null), document.getElementById('tweets'));
