function firstJob (timeoutTime) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello World');
        }, timeoutTime);
    });
}

async function firstJobResult (timeoutTime) {
    try {
        let result = await firstJob(timeoutTime);
        console.log('First Job in async/await: ', result);
    } catch (error) {
        console.error(error);
    }
}

firstJob(2000).then((result) => {
    console.log('FirstJob success: ', result);
})
.catch((error) => {
    console.log('FirstJob error: ', error);
})
.finally(() => {
    console.log('FirstJob done!');
});

firstJobResult(2000);