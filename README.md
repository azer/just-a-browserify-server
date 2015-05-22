## just-a-browserify-server

A simple, zero config Browserify server with customized [index.html](http://github.com/azer/indexhtml) which gets refreshed when you update the code.

## Install

```bash
$ npm install just-a-browserify-server
```

## Usage

```js
var serve = require('just-a-browserify-server')
serve('index.js', 'localhost:3000', function () {
  return {
    title: 'hello world',
    content: '<h1>hi there</h1>',
    css: ['default.css', 'pretty.css']
  };
})
```

This will browserify index.js and serve your app with a customized main HTML file. See [indexhtml](http://github.com/azer/indexhtml) for more options.
