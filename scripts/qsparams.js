var qsparams = {
  get: function(param, url) {
    var params = {};
    try {
      var prmstr = window.location.search.substr(1);
      if (url) {
        prmstr = url.split('?')[1];
      }
      var prmarr = prmstr.split('&');
      if (prmarr[0]) {
        for (var i = 0; i < prmarr.length; i++) {
          var tmparr = prmarr[i].split('=');
          params[tmparr[0]] = tmparr[1];
        }
      }
    } catch(err) {}
    if (param) {
      return params[param];
    }
    return params;
  },
  set: function(key, value, uri) {
    var haveUri = typeof uri !== 'undefined';
    if (!haveUri) {
      uri = window.location.href;
    }
    var newUri;
    var regex = new RegExp('([?|&])' + key + '=.*?(&|#|$)', 'i');
    var separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (regex.test(uri)) {
      newUri = uri.replace(regex, '$1' + key + '=' + value + '$2');
    } else {
      newUri = uri + separator + key + '=' + value;
    }
    if (!haveUri) {
      if (history.pushState) {
        window.history.pushState({path: newUri}, '', newUri);
      }
    }
    return newUri;
  }

};
