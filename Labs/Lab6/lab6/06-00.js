const http = require('http');
const url = require('url');

let server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/connection') {
        res.write(`KeepAliveTimeout: ${server.keepAliveTimeout}`);

        let set = Number(parsedUrl.query.set);
        if (Number.isInteger(set)) {
            server.keepAliveTimeout = set;
            res.write(`\nKeepAliveTimeout after changing: ${server.keepAliveTimeout}`);
        }
        res.end();
    }

    else if (req.method === 'GET' && parsedUrl.pathname === '/headers') {
        res.setHeader('Foo', 'bar');
        res.writeHead(200, {'Content-type': 'text/plain'})
        res.write("Request headers:\n\n");
        res.write(JSON.stringify(req.headers));
        res.write("\n\nResponse headers:\n");
        res.write(JSON.stringify(res.getHeaders()))
        res.end();
    }

    else if (req.method === 'GET' && parsedUrl.pathname === '/parameter') {

        const numX = parseInt(parsedUrl.query.x);
        const numY = parseInt(parsedUrl.query.y);
        if (isNaN(numX) || isNaN(numY)) {
            res.writeHead(400, {'Content-type': 'text/html'});
            res.end('<h1>Invalid type of arguments</h1>')
        } else {
            const sum = numX + numY;
            const difference = numX - numY;
            const composition = numX * numY;
            const division = numX / numY
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end(`Sum: ${sum}\nDifference: ${difference}\nComposition: ${composition}\nDivision: ${division}`);
        }

    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Not Found</h1>');
    }

});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
