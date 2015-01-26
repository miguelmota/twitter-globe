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

var TwitterSearchForm = React.createClass({
  render: function() {
    return (
      <form>
      <input type="search" placeholder="query"/>
      </form>
    )
  }
});

var tweets = [];

React.render(<TweetList tweets={tweets} />, document.getElementById('tweets'));
React.render(<TwitterSearchForm tweets={tweets} />, document.getElementById('twitter-search-form'));
