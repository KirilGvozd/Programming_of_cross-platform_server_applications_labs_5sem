const rpcWebSocket = require('rpc-websockets').Server;
const webSocketServer = new rpcWebSocket({ port: 4000, host: 'localhost' });
webSocketServer.setAuth(l => l.login === 'Kirill' && l.password === 'Kirill_Password');

webSocketServer.register('sum', (params) => {
    let sum = 0;
    params.forEach(element => {
        if (Number.isInteger(element))
            sum += element;
    });
    return sum;
}).public();


webSocketServer.register('mul', (params) => {
    let mul = 1;
    params.forEach(element => {
        if (Number.isInteger(element))
            mul *= element;
    });
    return mul;
}).public();


webSocketServer.register('square', (params) => {
    return (params.length === 2) ? (params[0] * params[1]) : (Math.PI * (params[0] ** 2));
}).public();


webSocketServer.register('fact', (params) => {
    if (params.length !== 1)
        return [1];
    return factorial(params);
}).protected();


webSocketServer.register('fib', (params) => {
    if (params.length !== 1)
        return [1];
    return fibonacci(params-1);
}).protected();




function factorial(n) {
    return (n == 1 || n == 0) ? 1 : n * factorial(n - 1);
}

function fibonacci(n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}