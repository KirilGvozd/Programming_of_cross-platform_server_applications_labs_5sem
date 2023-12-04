const webSocket = require('ws');

const webSocketServer = new webSocket.WebSocketServer({port: 4000, host: 'localhost'});
webSocketServer.on('connection', (ws) => {
    setInterval( () => {
        webSocketServer.clients.forEach( (client) => {
            let counter = 0;
            if (client.readyState === webSocket.OPEN) {
                client.send(`09-03-server: ${++counter}\n`)
            }
        });
    }, 15000);

    ws.on('pong', (data) => {
        console.log('On pong: ', data.toString());
    });
    ws.on('message', (data) => {
        console.log('On message: ', data.toString());
        ws.send(data);
    });
    setInterval( () => {
        console.log(`Server: ${webSocketServer.clients.size} active clients.`);
        ws.ping(`Server ping.`)
    }, 5000);
});