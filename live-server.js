var WebSocket = require("faye-websocket");
var browserify = require("browserify");
var watchify = require("watchify");
var concat = require("concat-stream");
var onSourceCodeChange = require("pubsub")();

var path = require("path");
var fs = require("fs");
var client = fs.readFileSync(path.join(__dirname, 'live-client.js')).toString();
var sockets = [];

module.exports = setup;

function setup (options, server) {
  build(options);

  if (options.nolive) return;

  server.on('upgrade', function (req, socket, body) {
    if (!WebSocket.isWebSocket(req)) return;

    var ws = new WebSocket(req, socket, body);
    var ind = sockets.push(ws) - 1;

    onSourceCodeChange.subscribe(notify);

    ws.on('close', function (event) {
      ws = null;
      sockets[ind] = undefined;
      onSourceCodeChange.unsubscribe(notify);
    });

    function notify () {
      ws.send(JSON.stringify({ restart: true }));
    }
  });
}

function build (options) {
  var b = browserify(watchify.args);
  var w = watchify(b);

  b.add(options.entry);

  if (options.transform) {
    options.transform.forEach(function (t) {
      b.transform(t);
    });
  }

  w.on('update', function () {
    bundle();
    onSourceCodeChange.publish();
  });

  bundle();

  function bundle () {
    b.bundle().on('error', onError).pipe(concat(function (data) {
      module.exports.bundle = data + '\n\n' + (options.nolive ? '' : client);
    }));
  }

  function onError (err) {
    console.error(err);
    setTimeout(bundle, 1000);
  }

}
