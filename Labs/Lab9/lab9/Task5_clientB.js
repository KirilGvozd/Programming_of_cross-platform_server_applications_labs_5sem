const async = require('async');
const rpcWebSocket = require('rpc-websockets').Client;
let ws = new rpcWebSocket('ws://localhost:4000/');


let h = (x = ws) => async.parallel({
    'Square of the circle: ': cb => { ws.call('square', [3]).catch(e => cb(e, null)).then(r => cb(null, r)); },
    'Square of a rectangle: ': cb => { ws.call('square', [5, 4]).catch(e => cb(e, null)).then(r => cb(null, r)); },
    'Sum': cb => { ws.call('sum', [2]).catch(e => cb(e, null)).then(r => cb(null, r)); },
    'Sum': cb => { ws.call('sum', [2, 4, 6, 8, 10]).catch(e => cb(e, null)).then(r => cb(null, r)); },
    'Multiply: ': cb => { ws.call('mul', [3]).catch(e => cb(e, null)).then(r => cb(null, r)); },
    'Multiply': cb => { ws.call('mul', [3, 5, 7, 9, 11, 13]).catch(e => cb(e, null)).then(r => cb(null, r)); },
    '1 fibonacci number = ': cb => {
        ws.login({ login: 'Kirill', password: 'Kirill_Password' }).then(login => {
            ws.call('fib', [1]).catch(e => cb(e, null)).then(r => cb(null, r));
        })
    },
    '2 fibonacci numbers = ': cb => {
        ws.login({ login: 'Kirill', password: 'Kirill_Password' }).then(login => {
            ws.call('fib', [2]).catch(e => cb(e, null)).then(r => cb(null, r));
        })
    },
    '7 fibonacci numbers = ': cb => {
        ws.login({ login: 'Kirill', password: 'Kirill_Password' }).then(login => {
            ws.call('fib', [7]).catch(e => cb(e, null)).then(r => cb(null, r));
        })
    },
    'Factorial of 0 = ': cb => {
        ws.login({ login: 'Kirill', password: 'Kirill_Password' }).then(login => {
            ws.call('fact', [0]).catch(e => cb(e, null)).then(r => cb(null, r));
        })
    },
    'Factorial of 5 = ': cb => {
        ws.login({ login: 'Kirill', password: 'Kirill_Password' }).then(login => {
            ws.call('fact', [5]).catch(e => cb(e, null)).then(r => cb(null, r));
        })
    },
    'Factorial of 10 = ': cb => {
        ws.login({ login: 'Kirill', password: 'Kirill_Password' }).then(login => {
            ws.call('fact', [10]).catch(e => cb(e, null)).then(r => cb(null, r));
        })
    }
}, (error, result) => {
    if (error)
        console.log('\nError: ', error);
    else
        console.log('\nResult =', result);
    ws.close();
});


ws.on('open', h);