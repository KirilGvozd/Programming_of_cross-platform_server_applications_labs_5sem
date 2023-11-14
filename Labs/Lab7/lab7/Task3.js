const axios = require('axios');
const http = require('http');

let data = {x: 2, y: 3, s: 'dfgh'};

axios.post('http://localhost:5000/postRequest', data).then((res) => {
    console.log(`Status: ${res.status}`);
    console.log(`Data: ${res.data}`);
}).catch((err) => {
    console.log(`Error in POST-request: ${err}`);
});