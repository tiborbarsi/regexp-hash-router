// tests.js


var test = require('tape');
var Events = require('events');
var Router = require('../router');


function setup() {
  location.hash = '';

  return Object.assign(new Events(), Router, {
    routes: {
      '/': 'home',
      '/posts': 'posts:list',
      '/posts/([0-9]+)/([a-z0-9-]+)': 'posts:detail'
    },
    defaultPath: '/'
  });
}



test('Router Init without hash', function(t) {
  var router = setup();
  t.plan(5);

  router.init();
  t.equal(location.hash.replace('#', ''), '/', '.init sets .defaultPath if No hash');

  t.equal(router._routes.home.toString(), '/^\\/$/', '.compile compiles the regexp strings');

  router.once('posts:list', function() {
    t.pass('router calls .emit');});

  router.once('posts:detail', function(year, slug) {
    t.equal(year, '2016', 'router passes the first arg');
    t.equal(slug, 'state-of-the-art', 'router passes the second arg');});


  setTimeout(function() {
    location.hash = '/posts';}, 100);

  setTimeout(function() {
    location.hash = '/posts/2016/state-of-the-art';}, 200);
});



test('Router Init with hash', function(t) {
  var router = setup();
  location.hash = '/posts';
  t.plan(2);

  router.once('posts:list', function() {
    t.pass('.init calls .onHashChange if hash');});

  router.init();
  t.equal(location.hash.replace('#', ''), '/posts', '.init does Not set .defaultPath if hash');
});
