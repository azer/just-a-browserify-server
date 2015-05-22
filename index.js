var serve = require("just-a-server");
var indexhtml = require("indexhtml");
var path = require("path");
var live = require("./live-server");

module.exports = start;

function start (options, hostname, contextFn) {
  if (typeof options == 'string') {
    options = {
      entry: options
    };
  }

  live(options, serve(path.dirname(options.entry), hostname, function (path, req, res) {
    if (path == 'dist.js') {
      res.end(live.bundle);
      return true;
    }

    if (path == 'index.html') return main(req, res, contextFn);
  }));
}

function main (req, res, contextFn) {
  var context = contextFn();

  context.js || (context.js = []);
  context.js.push('dist.js');

  res.end(indexhtml(context));
}
