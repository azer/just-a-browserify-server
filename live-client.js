/* just-a-browserify-server socket client to refresh when the source code changes */
(function () {

  var connected = false;

  connect();

  function connect () {
    var ws = window.ws = new WebSocket(document.location.origin.replace('http', 'ws'));
    ws.onopen = open;
    ws.onmessage = message;
    ws.onclose = close;

    console.log('just-a-browserify-server: watching for changes.');
  }

  function open () {
    connected = true;
  }

  function message (event) {
    var msg = JSON.parse(event.data);
    document.location.href = document.location.href;
    console.log('just-a-browserify-server: changes has been made, refreshing the page..');
  }

  function close () {
    connected = false;
    reconnect();
  }

  function reconnect () {
    if (connected) return;
    connect();
    setTimeout(reconnect, 1000);
  }

}());
