// tests.js


var test = require('tape');
var Events = require('events');
var Router = require('../router');


function setup() {
  var router = Object.assign(new Events(), Router, {
    routes: {
      '/': 'home',
      '/users/([0-9]+)': 'users:detail'
    },
    defaultPath: '/'
  });
  return router;
}


test('Router Test', function(t) {
  var router = setup();
  t.plan(4);

  t.equal(location.hash.replace('#', ''), '', 'no hash');

  router.init();
  t.equal(router._routes.home.toString(), '/^\\/$/', '.compile compiles regexp strings');
  t.equal(location.hash.replace('#', ''), '/', '.defaultPath if no hash');

  setTimeout(function() {
    router.on('users:detail', function(id) {
      t.equal(id, '10', 'router calls .emit with arguments');
    });
    location.hash = '/users/10';
  }, 100);
});
