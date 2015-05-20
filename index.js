var serve = require("just-a-server");
var render = require("format-text");
var browserify = require("browserify");
var path = require("path");
var fs = require("fs");
var template = fs.readFileSync(path.join(path.dirname(__filename), 'template.html'));

module.exports = start;

function start (entry, hostname, contextFn) {
  serve(path.dirname(entry), hostname, function (path, req, res) {
    if (path == 'dist.js') return build(entry).pipe(res);
    if (path == 'index.html') return main(req, res, contextFn);
  });
}

function main (req, res, contextFn) {
  var context = contextFn();

  if (typeof context.css == 'string') context.css = [context.css];
  context.css = (context.css || []).map(link).join('\n');

  res.end(render(template, context));
}

function link (href) {
  return '<link rel="stylesheet" href="' + href + '" />';
}

function build (entry) {
  var b = browserify();
  b.add(entry);
  return b.bundle();
}
