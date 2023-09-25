let http = require('http');
let fs = require('fs');

const name_of_file = 'pic.png';
let png = null;
http.createServer(function (req, res) {
    if (req.url === "/png" && req.method === 'GET') {
        fs.stat(name_of_file, (err, stat) => {
            if (err) {
                console.log('error: ', err);
            } else {
                png = fs.readFileSync(name_of_file);
                res.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': stat.size});
                res.end(png, 'binary');
            }
        })
    } else {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8;"});
        res.write("<h2>Not found</h2>");
        res.end();
    }
}).listen(5000);

console.log("Server is running at http://localhost:5000");