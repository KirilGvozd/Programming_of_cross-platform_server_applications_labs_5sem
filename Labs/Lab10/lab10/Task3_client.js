const udp = require('dgram');
const client = udp.createSocket('udp4');
const HOST = '0.0.0.0';
const PORT = 3000;

let message = process.argv[2] ? process.argv[2] : 'Default client message';

client.on('message', (message, info) => {
    console.log('Client: received from the server ' + message.toString());
    console.log('Client: received %d bytes from %s:%d\n', message.length, info.address, info.port);
    client.close();
});

client.send(message, PORT, HOST, (error) => {
    if (error) {
        console.log(error.message);
        client.close();
    } else {
        console.log('The message was sent to the server.');
    }
});

client.on('error', (error) => {
    console.log(error.message);
    client.close();
});

client.on('close', () => {
    console.log('Client closed');
});