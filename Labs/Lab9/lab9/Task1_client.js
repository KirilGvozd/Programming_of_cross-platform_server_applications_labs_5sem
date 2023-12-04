const fs = require('fs');
const webSocket = require('ws');

const webSocketClient = new webSocket('ws://localhost:4000');
webSocketClient.on('open', () => {
    const duplex = webSocket.createWebSocketStream(webSocketClient, {encoding: 'utf-8'});
    let fileForRead = fs.createReadStream('./MyFile.txt');
    fileForRead.pipe(duplex);
})