const fs = require('fs');
const webSocket = require('ws');

const webSocketServer = new webSocket.WebSocketServer({port: 4000, host: 'localhost'});
webSocketServer.on('connection', (ws) => {
    const duplex = webSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let fileForRead = fs.createReadStream('./download/MyFile.txt');
    fileForRead.pipe(duplex);
})