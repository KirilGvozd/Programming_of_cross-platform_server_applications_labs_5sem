function thirdJob(data) {
    return new Promise((resolve, reject) => {
        if (typeof data != 'number') {
            reject('Error');
        }
        else if (data % 2 === 1) {
                setTimeout(() => {
                    resolve('Odd');
                }, 1000)
            }
        else if (data % 2 === 0) {
                setTimeout(() => {
                    reject('Even');
                }, 2000)
            }
    })
}

async function thirdJobResult (data) {
    try {
        let result = await thirdJob(data);
        console.log('SecondJob in async/await: ', result);
    } catch (error) {
        console.error('There is an error: ', error);
    }
}

thirdJob(11).then((result) => {
    console.log('ThirdJob success: ', result);
})
    .catch((error) => {
        console.log('ThirdJob error: ', error);
    })
    .finally(() => {
        console.log('ThirdJob done!');
    });

thirdJobResult('String');