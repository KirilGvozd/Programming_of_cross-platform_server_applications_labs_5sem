const fs = require('fs');
const webSocket = require('ws');

const webSocketClient = new webSocket('ws://localhost:4000');
let counter = 0;

webSocketClient.on('open', () => {
    const duplex = webSocket.createWebSocketStream(webSocketClient, {encoding: 'utf-8'});
    let file = fs.createWriteStream(`./File${++counter}.txt`);
    duplex.pipe(file);
    console.log('File was downloaded.')
})