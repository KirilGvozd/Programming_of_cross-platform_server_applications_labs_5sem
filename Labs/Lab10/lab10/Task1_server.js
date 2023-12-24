const net = require('net');

let HOST = '127.0.0.1';
let PORT = 40000;

net.createServer((socket) => {
    console.log('Server connected: ' + socket.remoteAddress + ':' + socket.remotePort);

    socket.on('data', (data) => {
        console.log('Server data: ' + socket.remoteAddress + ': ' + data);
        socket.write('Server received: ' + data);
    });

    socket.on('close', () => {
        console.log('Server closed: ' + socket.remoteAddress + ':' + socket.remotePort);
    })
}).listen(PORT, HOST);

console.log('TCP-server ' + HOST + ':' + PORT);