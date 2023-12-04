const rpcWebSocketServer = require('rpc-websockets').Server;

let server = new rpcWebSocketServer({port: 4000, host: 'localhost'});

server.event('A');
server.event('B');
server.event('C');

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let data = null;
    while ( (data = process.stdin.read()) != null) {
        switch (data.trim().toUpperCase()) {
            case 'A':
                server.emit('A', 'Event A has been emited.');
                break;
            case 'B':
                server.emit('B', 'Event B has been emited.');
                break;
            case 'C':
                server.emit('C', 'Event C has been emited.');
                break;
        }
    }
});