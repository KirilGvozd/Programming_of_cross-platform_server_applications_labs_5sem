const http = require('http');
const fs = require('fs');
const buffer = require("buffer");

let bound = '---bound--';
let body = `--${bound}\r\n`;
body += 'Content-Disposition: form-data; name="pngUpload"; filename="photo.png"\r\n';
body += 'Content-Type: application/octet-stream\r\n\r\n';

let options = {
    host: 'localhost',
    path: `/photoUpload`,
    port: 5000,
    method: 'POST',
    headers: {'Content-type': `multipart/form-data; boundary=${bound}`}
};

const req = http.request(options, (res) => {
    let data = '';

    console.log(`Status code: ${res.statusCode}`);
    console.log(`Status message: ${res.statusMessage}`);

    res.on('data', (chunk) => {
        data += chunk.toString();
    });
    res.on('end', () => {
        console.log(`\nBody: ${data}\n`);
        console.log(`Body length: ${Buffer.byteLength(data)}`);
    });
});

req.write(body);
let stream = new fs.ReadStream('./photo.png');
stream.on('data', chunk => {
    req.write(chunk);
    console.log('Chunk length = ', Buffer.byteLength(chunk));
})
stream.on('end', () => { req.end(`\r\n--${bound}--`); })

req.on('error', e => { console.log(`${e.message}\n\n`); })