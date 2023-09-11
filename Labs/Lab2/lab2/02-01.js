let http = require('http');
let fs = require('fs')

http.createServer((req, res) => {
    let html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
    res.end(html);
}).listen(5000);

console.log("Server is running at http://localhost:5000");