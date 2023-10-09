function secondDegree (number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number === 'number') {
                resolve(Math.pow(number, 2));
            } else {
                reject('Error')
            }
        }, 100)
    });
}

function thirdDegree (number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number === 'number') {
                resolve(Math.pow(number, 3));
            } else {
                reject('Error')
            }
        }, 1500)
    });
}

function fourthDegree (number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number === 'number') {
                resolve(Math.pow(number, 4));
            } else {
                reject('Error')
            }
        }, 2000)
    });
}

let number = 15;
Promise.race([secondDegree(number), thirdDegree(number), fourthDegree(number)]).then((result) => {
    console.log('First resolved result in Promise.race(): ', result);
})
    .catch(error => {
        console.log('Error message: ', error);
    })
    .finally(() => {
        console.log('The end of program.');
    });

Promise.any([secondDegree('number'), thirdDegree('number'), fourthDegree(number)]).then((result) => {
    console.log('First resolved result in Promise.any(): ', result);
})
    .catch(error => {
        console.log('Error message: ', error);
    })
    .finally(() => {
        console.log('The end of program.');
    });