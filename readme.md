# Regexp Hash Router

A front-end hash routing library where **routes are regexp strings**.

It has *less than 40 lines of code*. But it **requires an events library** for firing events.


## Install

```
npm install -S regexp-hash-router
```

**NOTE:** You'll need an *events library* that has `.emit`, check [events](https://www.npmjs.com/package/events).


## Quick Start

```html
<!-- index.html -->
<a href="#/">Home</a>
<a href="#/users">User List</a>
<a href="#/users/11">User Detail</a>

<a href="#/users/11">User Detail</a>
```

```js
// index.js
var Events = require('events');
var Router = require('regexp-hash-router');


var router = Object.assign(new Events(), Router, {
  routes: {
    '/': 'home',
    '/users': 'users:list',
    '/users/([0-9]+)': 'users:detail',

    '/posts/([0-9]+)/([a-zA-Z-]+)': 'posts:detail'
  },
  defaultPath: '/'
});

router.init();


router.on('home', function() {
  console.log('home');});

router.on('users:detail', function(id) {
  console.log('users:detail', id);});

router.on('posts:detail', function(year, slug) {
  console.log('posts:detail', year, slug);});
```


## License

**MIT**
