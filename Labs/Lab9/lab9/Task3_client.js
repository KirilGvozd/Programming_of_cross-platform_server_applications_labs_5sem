const webSocket = require('ws');
const ws = new webSocket('ws://localhost:4000');
const duplex = webSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
duplex.pipe(process.stdout);
process.stdin.pipe(duplex);