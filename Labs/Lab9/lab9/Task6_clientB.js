const rpcWebSocketClient = require('rpc-websockets').Client;

let webSocketClient = new rpcWebSocketClient('ws://localhost:4000');

webSocketClient.on('open', () => {
    webSocketClient.subscribe('B');
    webSocketClient.on('B', (data) => {
        console.log(`B: ${data}`);
    });
});