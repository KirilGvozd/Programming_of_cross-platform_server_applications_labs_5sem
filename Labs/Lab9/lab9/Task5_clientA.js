const rpcWebSocket = require('rpc-websockets').Client;
let ws = new rpcWebSocket('ws://localhost:4000/');

ws.on('open', () => {
    ws.call('square', [3]).then(r => { console.log(`\nSquare of the circle: ${r}`) });
    ws.call('square', [5, 4]).then(r => { console.log(`Square of a rectangle = ${r}`) });
    ws.call('sum', [2]).then(r => { console.log(`Sum = ${r}`) });
    ws.call('sum', [2, 4, 6, 8, 10]).then(r => { console.log(`Sum = ${r}`) });
    ws.call('mul', [3]).then(r => { console.log(`Multiply = ${r}`) });
    ws.call('mul', [3, 5, 7, 9, 11, 13]).then(r => { console.log(`Multiply = ${r}`) });

    ws.login({ login: 'Kirill', password: 'Kirill_Password' }).then( (login) => {
        if (login) {
            ws.call('fib', [1]).catch(e => { console.log('Error in fib: ', e) }).then(r => { console.log(`1 fibonacci number = ${r}`) });
            ws.call('fib', [2]).catch(e => { console.log('Error in fib: ', e) }).then(r => { console.log(`2 fibonacci numbers = ${r}`) });
            ws.call('fib', [7]).catch(e => { console.log('Error in fib: ', e) }).then(r => { console.log(`7 fibonacci numbers = ${r}`) });
            ws.call('fact', [0]).catch(e => { console.log('Error in fact: ', e) }).then(r => { console.log(`Factorial of 0 = ${r}`) });
                    ws.call('fact', [5]).catch(e => { console.log('Error in fact: ', e) }).then(r => { console.log(`Factorial of 5 = ${r}`) });
            ws.call('fact', [10]).catch(e => { console.log('Error in fact: ', e) }).then(r => { console.log(`Factorial of 10 = ${r}`) });
        }
        else
            console.log('Incorrect login or password.');
    }, (error) => {
        console.log(error.message);
    });
});