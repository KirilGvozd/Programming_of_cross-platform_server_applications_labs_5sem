const udp = require('dgram');
const PORT = 3000;

let server = udp.createSocket('udp4');

server.on('error', (error) => {
    console.log('Error: ' + error);
    server.close();
});

server.on('message', (message, info) => {
    console.log('Server: received from client ' + message.toString());
    console.log('Server: received %d bytes from %s:%d\n', message.length, info.address, info.port);

    server.send('ECHO: ' + message, info.port, info.address, (error) => {
        if (error) {
            server.close();
        } else {
            console.log('Server: the data was sent to the client.');
        }
    });
});

server.on('listening', () => {
    console.log('Server: listening to port ' + server.address().port);
    console.log('Server: server IP-address: ' + server.address().address);
    console.log('Server: address family (IP4/IP6) ' + server.address().family);
});

server.on('close', () => {
    console.log('Server: socket is closed.');
});

server.bind(PORT);