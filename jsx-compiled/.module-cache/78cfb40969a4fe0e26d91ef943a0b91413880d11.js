var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    return (
      React.createElement("ul", null, 
        React.createElement(TweetListItem, null)
      )
    )
  }
});


var TweetListItem = React.createClass({displayName: "TweetListItem",
  render: function() {
    var tweets = [{text: 'foo'}];
    return (
      this.props.tweets.map(function(tweet) {
        return React.createElement("li", null, tweet.text);
      })
    );
  }
});

React.renderComponent(React.createElement(TweetList, null), document.getElementById('tweets'));
