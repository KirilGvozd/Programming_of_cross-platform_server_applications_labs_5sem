const rpcWebSocketClient = require('rpc-websockets').Client;

let webSocketClient = new rpcWebSocketClient('ws://localhost:4000');

webSocketClient.on('open', () => {
    webSocketClient.subscribe('C');
    webSocketClient.on('C', (data) => {
        console.log(`C: ${data}`);
    });
});