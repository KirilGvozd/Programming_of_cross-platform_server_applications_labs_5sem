 function secondDegree (number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
        resolve(Math.pow(number, 2));
        } else {
            reject('Error');
        }
    });
}

function thirdDegree (number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            resolve(Math.pow(number, 3));
        } else {
            reject('Error');
        }
    });
}

function fourthDegree (number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            resolve(Math.pow(number, 4));
        } else {
            reject('Error');
        }
    });
}

let number = 20;
Promise.all([secondDegree(number), thirdDegree(number), fourthDegree(number)]).then((result) => {
    console.log(`Square: ${result[0]}`);
    console.log(`Cube: ${result[1]}`);
    console.log(`Fourth degree: ${result[2]}`);
})
 .catch(error => {
     console.log('Error message: ', error);
 })
 .finally(() => {
     console.log('The end of program.');
 });