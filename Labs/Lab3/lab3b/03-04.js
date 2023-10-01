let uuid = require('uuid');

function createOrder (numberOfCard) {
    let orderId;
    return new Promise((resolve, reject) => {
        if (validateCard(numberOfCard)) {
            orderId = uuid.v4();
            setTimeout(() => {
                resolve(
                proceedPayment(orderId).then((result) => {
                    console.log(result);
                })
                    .catch((error) => {
                      console.log(error);
                    })
                    .finally(() => {
                        console.log('End of payment.');
                    })
                );
        }, 5000);
        } else {
            reject('Card is not valid');
        }
    });
}

function validateCard (numberOfCard) {
    console.log('Card number: ', numberOfCard);
    return Math.random() > 0.5;
}

function proceedPayment (orderId) {
    console.log('Order ID: ', orderId);
    return new Promise((resolve, reject) => {
        if (Math.random() <= 0.5) {
            reject('Payment failed.');
        }
        else {
            resolve('Payment successful.');
        }
    })
}

async function createOrderResult (numberOfCard) {
    try {
        let result = await createOrder(numberOfCard);
        console.log('Creating order in async/await: ', result);
    } catch (error) {
        console.error('There is an error: ', error);
    }
}

createOrder('1234 5678 9101 1121').then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error);
})
.finally(() => {
    console.log('Finally message.');
});

// createOrderResult('1234 5678 9101 1121');