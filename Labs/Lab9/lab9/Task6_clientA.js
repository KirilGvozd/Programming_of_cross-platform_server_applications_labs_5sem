const rpcWebSocketClient = require('rpc-websockets').Client;

let webSocketClient = new rpcWebSocketClient('ws://localhost:4000');

webSocketClient.on('open', () => {
    webSocketClient.subscribe('A');
    webSocketClient.on('A', (data) => {
        console.log(`A: ${data}`);
    });
});