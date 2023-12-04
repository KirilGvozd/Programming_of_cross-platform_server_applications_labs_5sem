const rpcWebSocketServer = require('rpc-websockets').Server;

let server = new rpcWebSocketServer({port: 4000, host: 'localhost'});

server.register('A', () => {
    console.log('A: notify');
});
server.register('B', () => {
    console.log('B: notify');
});
server.register('C', () => {
    console.log('C: notify');
});