const http = require('http');
const qs = require('querystring');

let params = qs.stringify({x: 3, y: 123});
let path = `/params?${params}`;

const options = {
    host: 'localhost',
    path: path,
    port: 5000,
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);
    console.log(`Status message: ${res.statusMessage}`);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk.toString('utf-8');
    });
    res.on('end', () => {
        console.log(`Data: ${data}`);
    })
});

req.on('error', (e) => {
    console.log(`Error: ${e.message}`);
});

req.end();