http = require('http');

const options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);
    console.log(`Status message: ${res.statusMessage}`);
    console.log(`Remote address: ${res.socket.remoteAddress}`);
    console.log(`Remote port: ${res.socket.remotePort}`);
});

req.on('error', (e) => {
    console.log(`Error: ${e.message}`);
});

req.end();