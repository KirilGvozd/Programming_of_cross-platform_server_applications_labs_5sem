const net = require('net');

let HOST = '127.0.0.1';
let PORT = Number(process.argv[2] ? process.argv[2] : 40000);

let client = new net.Socket();
let buffer = new Buffer.alloc(4);
let timerId = null;
let x = Number(process.argv[3] ? process.argv[3] : 1);

client.connect(PORT, HOST, () => {
    console.log('Client connected: ' + client.remoteAddress + ':' + client.remotePort);

    timerId = setInterval( () => {
        buffer.writeInt32LE(x, 0);
        client.write(buffer);
    }, 1000);

    setTimeout( () => {
        clearInterval(timerId);
        client.end();
    }, 30000);
});

client.on('data', (data) => {
    console.log('Client data: ' + data.readInt32LE());
});

client.on('close', () => {
    console.log('Client close');
});

client.on('error', (error) => {
    console.log('Client error: ' + error);
});