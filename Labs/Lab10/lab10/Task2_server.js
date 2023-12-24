const net = require('net');

let HOST = '127.0.0.1';
let FIRST_PORT = 40000;
let SECOND_PORT = 50000;

let connections = new Map();

let firstServer = net.createServer();
let secondServer = net.createServer();

let h = (server) => {
    return (socket) => {
        let serverInterval = null;
        console.log('Server connected to' + socket.remoteAddress + ':'+ socket.remotePort);

        socket.id = (new Date()).toISOString();

        connections.set(socket.id, 0);
        console.log('Socket ID: ', socket.id);

        server.getConnections((e, c) => {
            if (!e) {
                console.log('Connected: ' + socket.remoteAddress + ':' + socket.remotePort + ' ' + c);
                for (let [key, value] of connections) {
                    console.log(key, value);
                }
            }
        });

        socket.on('data', (data) => {
            console.log('Data: ' + socket.remoteAddress + ':' + socket.remotePort + ' ' + data.readInt32LE());
            connections.set(socket.id, connections.get(socket.id) + data.readInt32LE());
            console.log('Sum: ' + connections.get(socket.id));
        });

        let buffer = Buffer.alloc(4);

        serverInterval = setInterval(() => {
            buffer.writeInt32LE(connections.get(socket.id), 0);
            socket.write(buffer);
        }, 5000);

        socket.on('error', err => {
            console.log('Error: ' + socket.remoteAddress + ':' + socket.remotePort + ', message: ' + err.message);
            clearInterval(serverInterval);
            connections.delete(socket.id)
        });

        socket.on('close', () => {
            console.log('Socket closed: ' + socket.remoteAddress + ':' + socket.remotePort + ' ' + socket.id);
            clearInterval(serverInterval);
            connections.delete(socket.id);
        });
    };
};
firstServer.on('connection', h(firstServer));

firstServer.listen(FIRST_PORT, HOST).on('listening', () => {
    console.log('\nServer is listening: ' + HOST + ':' + FIRST_PORT);
});

secondServer.on('connection', h(secondServer));

secondServer.listen(SECOND_PORT, HOST).on('listening', () => {
    console.log('\nServer is listening: ' + HOST + ':' + SECOND_PORT);
});