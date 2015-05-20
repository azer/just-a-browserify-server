## just-a-browserify-server

A simple, zero config Browserify server to save you from repeating yourself

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
    content: '<h1>hi there</h1>'
  };
})
```

This will browserify index.js and serve an HTML file including
