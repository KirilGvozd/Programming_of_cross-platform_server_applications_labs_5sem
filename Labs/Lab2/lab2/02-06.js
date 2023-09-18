http = require('http');
fs = require('fs');

http.createServer((req, res) => {
    let fileName = './jquery.html';
    if (req.url === '/jquery' && req.method === 'GET') {
        fs.stat(fileName, (err, stats) => {
            if (err) {
                console.error('error:', err);
            } else {
                let html = fs.readFileSync(fileName);
                res.writeHead(200, {'Content-type': 'text/html', 'Content-Length': stats.size});
                res.end(html);
            }
        })
    }
    else if (req.url === "/api/name" && req.method === 'GET') {
        res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8;"});
        res.end("Гвоздовский Кирилл Владимирович");
    }
    else {
        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8;"});
        res.write("<h2>Not found</h2>");
        res.end();
    }
}).listen(5000);

console.log("Server is running at http://localhost:5000");