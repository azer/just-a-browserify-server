var serve = require("../");

serve('./index.js', 'localhost:9000', function () {
  return {
    'title': 'unix time',
    'content': Date.now(),
    'css': 'style.css'
  };
});
