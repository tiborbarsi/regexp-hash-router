// router.js


var Router = {
  routes: {},
  defaultPath: '/',
  _routes: {},

  compile: function() {
    var routes = {};
    for (var route in this.routes)
      routes[this.routes[route]] = new RegExp('^' + route + '$');

    this._routes = routes;
  },
  onHashChange: function() {
    var hash = location.hash.replace('#', '');
    var args, data, k;

    for (k in this._routes) {
      if (this._routes[k].test(hash)) {
        args = this._routes[k].exec(hash) || [];
        args[0] = k;

        if (this.emit)  // Events.emit
          this.emit.apply(this, args);

        return;
      }
    }
  },
  init: function() {
    this.compile();
    window.addEventListener('hashchange', this.onHashChange.bind(this));

    if (location.hash.replace('#', '') === '')
      location.hash = this.defaultPath;
    else
      this.onHashChange(null);
  }
};


module.exports = Router;
