(function(root) {

  root.App = root.App || {};

  var routes = {
    '': function() {
      console.log('index');
    },
  };

  App.router = Router(routes);

  App.router.init();
})(window);
