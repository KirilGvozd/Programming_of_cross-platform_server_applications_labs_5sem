const rpcWebSocketClient = require('rpc-websockets').Client;
let webSocket = new rpcWebSocketClient('ws://localhost:4000');

webSocket.on('open', () => {
    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', () => {
        let data = null;
        while ( (data = process.stdin.read()) != null ) {
            switch (data.trim().toUpperCase()) {
                case 'A':
                    webSocket.notify('A');
                    break;
                case 'B':
                    webSocket.notify('B');
                    break;
                case 'C':
                    webSocket.notify('C');
                    break;
            }
        }
    });
});