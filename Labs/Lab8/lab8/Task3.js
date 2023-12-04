const WebSocket = require('ws');

const wss = new WebSocket.WebSocketServer({port: 5000, host: 'localhost', path: '/broadcast'});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('Server: ' + message);
            }
        });
    });

    ws.on('close', () => {
        console.log('WebSocketServer has been closed.');
    })
});

wss.on('error', (error) => {
    console.log(`WebSocket server error: ${error}`);
});

console.log(`WebSocket server: host: ${wss.options.host}, port: ${wss.options.port}, path: ${wss.options.path}`);