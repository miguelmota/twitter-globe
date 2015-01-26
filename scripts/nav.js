(function() {
  var button = document.querySelector('.navicon-button');
  var main = document.querySelector('#main');

  button.addEventListener('click', function(e) {
    button.classList.toggle('open');
    main.classList.toggle('expand');
  });
})();
