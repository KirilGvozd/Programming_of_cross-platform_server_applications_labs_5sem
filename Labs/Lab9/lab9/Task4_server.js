const webSocket = require('ws');

const webSocketServer = new webSocket.WebSocketServer({port: 4000, host: 'localhost'});

webSocketServer.on('connection', (ws) => {
    let counter = 0;
    ws.on('message', (data) => {
        console.log('On message: ', JSON.parse(data));
        setInterval( () => {
            ws.send(JSON.stringify({server: ++counter, client: JSON.parse(data).client, timestamp: new Date().toISOString()}));
        }, 3000);
    });
});