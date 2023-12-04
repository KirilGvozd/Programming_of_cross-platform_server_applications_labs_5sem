const fs = require('fs');
const webSocket = require('ws');

const webSocketServer = new webSocket.WebSocketServer({port: 4000, host: 'localhost'});
let counter = 0;

webSocketServer.on('connection', (ws) => {
    const duplex = webSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let file = fs.createWriteStream(`./upload/File${++counter}.txt`);
    duplex.pipe(file);
    console.log('File was uploaded.')
})