const http = require('http');
const child_process = require("child_process");

const object = JSON.stringify({
    "__comment": "Request. Lab 8/10",
    "x": 214,
    "y": 1244,
    "s": "Message",
    "m": ["a", "b", "c", "d"],
    "o": {
        "surname": "Gvozdovskiy",
        "name": "Kirill"
    }
});

const options = {
    host: 'localhost',
    path: '/jsonRequest',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

const req = http.request(options, (res) => {
    let data = '';

    console.log(`Status code: ${res.statusCode}`);
    console.log(`Status message: ${res.statusMessage}`);

    res.on('data', (chunk) => {
        data += chunk.toString();
    });
    res.on('end', () => {
        console.log(`Body: ${data}`);
    });

});

req.on('error', (error) => {
    console.log(`Error: ${error}`);
})

req.end(object);