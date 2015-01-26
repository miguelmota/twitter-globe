function validateDomain(v) {
  if (!v) { return false; }
  var re = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{1,32}?$/i;
  return re.test(v);
}

 function parseUrl(str) {
   return str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
     return url.link(url);
   });
}

function linkify(content) {
  if (!content) return content;
  var parts = content.match(/[^\s\t]+/gi);

  function createLink(text) {
    var a = document.createElement('a');
    var t = document.createTextNode(text);
    a.href = 'http://' + text;
    a.target = '_blank';
    a.appendChild(t);
    return a;
  }

  var linkified = _.map(parts, function(part, i) {
    return parseUrl(part);
  });

  return linkified.join(' ');
}
