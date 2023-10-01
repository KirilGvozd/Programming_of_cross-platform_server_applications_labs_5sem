const timeOut = 3000;

function secondJob () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Error in secondJob()');
        }, timeOut);
    });
}

async function secondJobResult () {
    try {
        let result = await secondJob();
        console.log('SecondJob in async/await: ', result);
    } catch (error) {
        console.error('There is an error: ', error);
    }
}

secondJob().then((result) => {
    console.log('SecondJob success: ', result);
})
    .catch((error) => {
        console.log('SecondJob error: ', error);
    })
    .finally(() => {
        console.log('SecondJob done!');
    });

secondJobResult();