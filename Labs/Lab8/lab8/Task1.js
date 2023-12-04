const http = require('http');
const webSocket = require('ws');
const fs = require('fs');

const httpServer = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/start') {
        res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
        res.end(fs.readFileSync('Task1.html'));
    }
    else {
        res.writeHead(400, {'Content-type': 'text/html; charset=utf-8'});
        res.end('<h1>Error, page not found</h1>');
    }
});

httpServer.listen(3000);
console.log('The server is running at http://localhost:3000');

let counter = 0;
let n = 0;

const webSocketServer = new webSocket.WebSocketServer({port: 4000, host: 'localhost', path: '/webSocketServer'});
webSocketServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        n = +message.toString().slice(-1);
    });
    setInterval(() => {
        ws.send(`Server: ${n}->${++counter}`);
    }, 5000);
});

webSocketServer.on('error', (error) => {
    console.log(`WebSocket server error: ${error}`);
});

console.log(`WebSocket server:\nhost: ${webSocketServer.options.host}\nport:${webSocketServer.options.port}\npath: ${webSocketServer.options.path}`);