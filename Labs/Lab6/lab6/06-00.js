let http = require('http');
let url = require('url');

let server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    res.writeHead(200, {'Content-type': 'text/html'});
    if (req.method === 'GET' && parsedUrl.pathname === '/connection') {
        const keepAliveTimeout = server.keepAliveTimeout;
        res.end(`keepAliveTimeout = ${keepAliveTimeout}`)
    }

    if (req.method === 'GET' && parsedUrl.pathname === '/connection' && 'set' in query) {
        let newTimeout = Number(parsedUrl.query.set);
        if (!isNaN(newTimeout)) {
            server.keepAliveTimeout = newTimeout;
            res.write(`New keepAliveTimeout is ${newTimeout}`);
        }
        res.end();
    }
});

server.listen(3000);
console.log('Server is running at http://localhost:3000');