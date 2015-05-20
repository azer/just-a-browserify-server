var serve = require("just-a-server");
var browserify = require("browserify");
var indexhtml = require("indexhtml");
var path = require("path");

module.exports = start;

function start (entry, hostname, contextFn) {
  serve(path.dirname(entry), hostname, function (path, req, res) {
    if (path == 'dist.js') {
      build(entry).pipe(res);
      return true;
    }

    if (path == 'index.html') return main(req, res, contextFn);
  });
}

function main (req, res, contextFn) {
  var context = contextFn();

  context.js || (context.js = []);
  context.js.push('dist.js');

  res.end(indexhtml(context));
}

function build (entry) {
  var b = browserify();
  b.add(entry);
  return b.bundle();
}
