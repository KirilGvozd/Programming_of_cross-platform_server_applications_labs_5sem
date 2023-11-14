const http = require('http');
const xmlbuilder = require('xmlbuilder');

let document = xmlbuilder.create('request').att('id', 33);
document.ele('x').att('value', 3);
document.ele('x').att('value', 2);
document.ele('m').att('value', 'a');
document.ele('m').att('value', 'c');

let options = {
    host: 'localhost',
    path: `/xmlRequest`,
    port: 5000,
    method: 'POST',
    headers: {'content-type': 'application/xml', 'accept': 'application/xml'}
}

const req = http.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);
    console.log(`Status message: ${res.statusMessage}`);
    let data = '';
    res.on('data', (chunk) => {
        data += chunk.toString();
    });
    res.on('end', () => {
        console.log('Body: ', data);
    });
});

req.write(document.toString({pretty: true}));
req.end();
