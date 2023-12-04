const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000/webSocketServer');

let n = 0;
let sendingInterval = null;

ws.onopen = () => {
    console.log('WebSocket has been opened');
    sendingInterval = setInterval(() => ws.send(`08-01-client: ${++n}`), 3000);
}

ws.onclose = () => console.log('WebSocket is closed');

ws.onmessage = (message) => console.log(message.data);

ws.onerror = (e) => console.log('Socket error', e);

setTimeout(() => {
    clearInterval(sendingInterval);
    ws.close(1000, 'Closing socket');
}, 25000);