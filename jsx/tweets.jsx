var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TweetList = React.createClass({
  render: function() {
    var tweetItems = this.props.tweets.map(function(tweet) {
      return <TweetListItem tweet={tweet} key={tweet.id_str} />
    }).reverse()
    return (
      <ul>
        <ReactCSSTransitionGroup transitionName="tweet">
        {tweetItems}
        </ReactCSSTransitionGroup>
      </ul>
    )
  }
});

var TweetListItem = React.createClass({
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
      mapMarker = <a className="fa fa-map-marker map-marker" onClick={this.locationClick}></a>
    }

    var classes = 'show';
    classes += (haveGeo ? ' geo' : '');

    return (
      <li className={classes}>
      <a href={'https://twitter.com/' + tweet.user.screen_name} target="_blank"><img src={tweet.user.profile_image_url} /></a>
      <a href={'https://twitter.com/' + tweet.user.screen_name} target="_blank" className="screen-name">@{tweet.user.screen_name}: </a>
      <span className="text" dangerouslySetInnerHTML={{__html: linkify(tweet.text) + ' '}}></span>
      <a href={'https://twitter.com/statuses/' + tweet.id_str} target="_blank" className="datetime">{tweet.created_at}</a>
      {mapMarker}
      </li>
    );
  }
});

var TwitterNavbar = React.createClass({
  getInitialState: function() {
    document.addEventListener('twitter:queryUpdated', function(event) {
      this.setState({query: event.detail.query});
      this.handleSearchButtonClick();
    }.bind(this));

    return {
      searchFormVisible: false,
      query: App.twitter.query
    };
  },

  handleSearchButtonClick: function() {
   this.setState({
        searchFormVisible: !this.state.searchFormVisible
    });
  },

  handleFormSubmit: function() {
    this.handleSearchButtonClick();
  },

  render: function() {
    var middleSection;
    if (!this.state.searchFormVisible) {
      middleSection = <div><div className="title"><a className="fa fa-twitter twitter-icon" href="https://twitter.com" target="_blank"></a><span className="glitch-text" data-text="twitter">twitter</span></div><a className={'fa fa-search search-button'} onClick={this.handleSearchButtonClick}></a><div className="query-text">q: {this.state.query}</div></div>
    } else {
      middleSection = <div><div id="twitter-search-form"><TwitterSearchForm ref="searchForm" onSubmit={this.handleFormSubmit} /></div></div>
      _.delay(function() {
        this.refs.searchForm.getDOMNode().querySelector('input').focus();
      }.bind(this));
    }

    return (
      <div>
      <div className={'left-section'}></div>
      <div className={'middle-section' + (this.state.searchFormVisible ? ' search-form-visible' : '')}>
      {middleSection}
      </div>
      <div className={'right-section'}>
      <a className={'navicon-button larr open'}>
      <div className={'navicon'}></div>
      </a>
      </div>
      </div>
    )
  }
});

var TwitterSearchForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var query = this.refs.query.getDOMNode().value.trim();
    console.log('twitter form query:', query);
    var evt = new CustomEvent('twitter:queryUpdated', {detail: {query: query}});
    document.dispatchEvent(evt);
    if (_.isFunction(this.props.onSubmit)) {
      this.props.onSubmit(query);
    }
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
      <input type="search" placeholder="query" ref="query" />
      <a className={'fa fa-search search-button'} onClick={this.handleSubmit}></a>
      </form>
    )
  }
});

var tweets = [];

React.render(<TwitterNavbar />, document.getElementById('twitter-nav'));
React.render(<TweetList tweets={tweets} />, document.getElementById('tweets'));
