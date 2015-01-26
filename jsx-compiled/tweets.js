var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
    var tweetItems = this.props.tweets.map(function(tweet) {
      return React.createElement(TweetListItem, {tweet: tweet, key: tweet.id_str})
    }).reverse()
    return (
      React.createElement("ul", null, 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "tweet"}, 
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

var TwitterNavbar = React.createClass({displayName: "TwitterNavbar",
  getInitialState: function() {
    document.addEventListener('twitter:queryUpdated', function(event) {
      this.setState({query: event.detail.query});
      this.searchButtonClick();
    }.bind(this));

    return {
      searchFormVisible: false,
      query: '@twitter'
    };
  },

  searchButtonClick: function() {
   this.setState({
        searchFormVisible: !this.state.searchFormVisible
    });
  },

  render: function() {
    var middleSection;
    if (!this.state.searchFormVisible) {
      middleSection = React.createElement("div", null, React.createElement("div", {className: "title"}, React.createElement("a", {className: "fa fa-twitter twitter-icon", href: "https://twitter.com", target: "_blank"}), React.createElement("span", {className: "glitch-text", "data-text": "twitter"}, "twitter")), React.createElement("a", {className: 'fa fa-search search-button', onClick: this.searchButtonClick}), React.createElement("div", {className: "query-text"}, "q: ", this.state.query))
    } else {
      middleSection = React.createElement("div", null, React.createElement("div", {id: "twitter-search-form"}, React.createElement(TwitterSearchForm, {ref: "searchForm"})), React.createElement("a", {className: 'fa fa-search search-button', onClick: this.searchButtonClick}))
      _.delay(function() {
        this.refs.searchForm.getDOMNode().querySelector('input').focus();
      }.bind(this));
    }

    return (
      React.createElement("div", null, 
      React.createElement("div", {className: 'left-section'}), 
      React.createElement("div", {className: 'middle-section' + (this.state.searchFormVisible ? ' search-form-visible' : '')}, 
      middleSection
      ), 
      React.createElement("div", {className: 'right-section'}, 
      React.createElement("a", {className: 'navicon-button larr open'}, 
      React.createElement("div", {className: 'navicon'})
      )
      )
      )
    )
  }
});

var TwitterSearchForm = React.createClass({displayName: "TwitterSearchForm",
  handleSubmit: function(event) {
    event.preventDefault();
    var query = this.refs.query.getDOMNode().value.trim();
    console.log('twitter form query:', query);
    var evt = new CustomEvent('twitter:queryUpdated', {detail: {query: query}});
    document.dispatchEvent(evt);
  },
  render: function() {
    return (
      React.createElement("form", {onSubmit: this.handleSubmit}, 
      React.createElement("input", {type: "search", placeholder: "query", ref: "query"})
      )
    )
  }
});

var tweets = [];

React.render(React.createElement(TwitterNavbar, null), document.getElementById('twitter-nav'));
React.render(React.createElement(TweetList, {tweets: tweets}), document.getElementById('tweets'));
