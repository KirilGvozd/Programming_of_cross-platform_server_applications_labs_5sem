const webSocket = require('ws');
let parm = process.argv[2];
let clientName = typeof parm == 'undefined' ? 'default_name' : parm;

const ws = new webSocket('ws://localhost:4000');
ws.on('open', () => {
    let counter = 0;
    ws.on('message', (data) => {
        console.log('On message: ', JSON.parse(data));
    });

    setInterval( () => {
        ws.send(JSON.stringify({client: clientName, timestamp: new Date().toISOString()}));
    }, 5000);
});