const http = require('http');
const fs = require('fs');

let options = {
    host: 'localhost',
    path: `/photoDownload`,
    port: 5000,
    method: 'GET',
};

const req = http.request(options, (res) => {
    res.pipe(fs.createWriteStream('new_photo.png'));
});
req.end();