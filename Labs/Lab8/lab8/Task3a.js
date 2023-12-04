const WebSocket = require('ws');

let parm0 = process.argv[0];
let parm1 = process.argv[1];
let parm2 = process.argv[2];

console.log(`Parm2 = ${parm2}`);

let prfx = typeof parm2 == 'undefined' ? 'G' : parm2;
const ws = new WebSocket('ws://localhost:5000/broadcast');

ws.on('open', () => {
    let k = 0;
    setInterval(() => {
        ws.send(`Client: ${prfx}-${++k}`);
    }, 1000);

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    setTimeout(() => {
        ws.close(1000, 'The socket has been closed.');
    }, 25000);
});