function secondDegree (number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            setTimeout(() => {
            resolve(Math.pow(number, 2));
            }, 100);
        } else {
            setTimeout(() => {
                reject('Error');
            }, 2000)
        }
    });
}

function thirdDegree (number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            setTimeout(() => {
                resolve(Math.pow(number, 3));
            }, 1000);
        } else {
            setTimeout(() => {
            reject('Error');
            }, 2000)
        }
    });
}

function fourthDegree (number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            setTimeout(() => {
                resolve(Math.pow(number, 4));
            }, 1500);
        } else {
            setTimeout(() => {
                reject('Error');
            }, 2000)
        }
    });
}

let number = 15;
Promise.race([secondDegree(number), thirdDegree(number), fourthDegree(number)]).then((result) => {
    console.log('First resolved result: ', result);
})
    .catch(error => {
        console.log('Error message: ', error);
    })
    .finally(() => {
        console.log('The end of program.');
    });

Promise.any([secondDegree(number), thirdDegree(number), fourthDegree(number)]).then((result) => {
    console.log('First resolved result: ', result);
})
    .catch(error => {
        console.log('Error message: ', error);
    })
    .finally(() => {
        console.log('The end of program.');
    });