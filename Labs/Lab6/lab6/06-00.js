const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const xml2js = require('xml2js');
const path = require("path");
const multiparty = require('multiparty');

let server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Task 1
    if (req.method === 'GET' && parsedUrl.pathname === '/connection') {
        res.write(`KeepAliveTimeout: ${server.keepAliveTimeout}`);

        let set = Number(parsedUrl.query.set);
        if (Number.isInteger(set)) {
            server.keepAliveTimeout = set;
            res.write(`\nKeepAliveTimeout after changing: ${server.keepAliveTimeout}`);
        }
        res.end();
    }

    // Task 2
    else if (req.method === 'GET' && parsedUrl.pathname === '/headers') {
        res.setHeader('Foo', 'bar');
        res.writeHead(200, {'Content-type': 'text/plain'})
        res.write("Request headers:\n\n");
        res.write(JSON.stringify(req.headers));
        res.write("\n\nResponse headers:\n");
        res.write(JSON.stringify(res.getHeaders()))
        res.end();
    }


    // Task 3
    else if (req.method === 'GET' && parsedUrl.pathname === '/parameter') {

        const x = parseInt(parsedUrl.query.x);
        const y = parseInt(parsedUrl.query.y);
        if (isNaN(x) || isNaN(y)) {
            res.writeHead(400, {'Content-type': 'text/html'});
            res.end('<h1>Invalid type of arguments</h1>')
        } else {
            const sum = x + y;
            const difference = x - y;
            const composition = x * y;
            const division = x / y
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end(`Sum: ${sum}\nDifference: ${difference}\nComposition: ${composition}\nDivision: ${division}`);
        }

    }


    // Task 4
    else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/parameter/')) {
        const pathParts = parsedUrl.path.split('/');
        if (pathParts.length === 4) {
            const x = parseInt(pathParts[2]);
            const y = parseInt(pathParts[3]);
            if (isNaN(x) || isNaN(y)) {
                res.writeHead(200, {'Content-type': 'text/plain'});
                res.end(parsedUrl.path);
            } else {
                const sum = x + y;
                const difference = x - y;
                const composition = x * y;
                const division = x / y
                res.writeHead(200, {'Content-type': 'text/plain'});
                res.end(`Sum: ${sum}\nDifference: ${difference}\nComposition: ${composition}\nDivision: ${division}`);
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Not Found</h1>');
        }
    }

    // Task 5
    else if (req.method === 'GET' && parsedUrl.pathname === '/socket') {
        const clientAddress = req.connection.remoteAddress;
        const clientPort = req.connection.remotePort;
        const serverAddress = server.address().address;
        const serverPort = server.address().port;

        res.writeHead(200, {'Content-type': 'text/plain'});
        res.end(`Client IP: ${clientAddress}, Client Port: ${clientPort}, Server IP: ${serverAddress}, Server Port: ${serverPort}`);
    }

    // Task 6
    else if (req.method === 'GET' && parsedUrl.pathname === '/resp-status') {
        const statusCode = parseInt(parsedUrl.query.code);
        const statusMessage = parsedUrl.query.mess || '';

        if (!isNaN(statusCode) && statusCode >= 100 && statusCode <= 599) {
            res.writeHead(statusCode, {'Content-type': 'text/plain'});
            res.end(`${statusCode} - ${statusMessage}`);
        } else {
            res.writeHead(400, {'Content-type': 'text/html'});
            res.end('<h1>Invalid status code</h1>');
        }
    }

    // Task 7
    else if (req.method === 'GET' && parsedUrl.pathname === '/formparameter') {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(fs.readFileSync('./form.html'));
    }
    else if (req.method === 'POST' && parsedUrl.pathname === '/formparameter') {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            const formData = qs.parse(data);

            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(`Received form data:\n ${JSON.stringify(formData, null, 2)}`);
        });
    }

    // Task 8
    else if (req.method === 'POST' && parsedUrl.pathname === '/json') {
        let data = '';

        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                const requestData = JSON.parse(data);

                const x_plus_y = requestData.x + requestData.y;
                const Concatination_s_o = `${requestData.s}: ${requestData.o.surname}, ${requestData.o.name}`;
                const Length_m = requestData.m.length;

                const response = {
                    "__coment": "Response. Lab 6/8",
                    "x_plus_y": x_plus_y,
                    "Concatination_s_o": Concatination_s_o,
                    "Length_m": Length_m
                };

                const responseJSON = JSON.stringify(response);

                res.writeHead(200, {'Content-type': 'application/json'});
                res.end(responseJSON);

            } catch (error) {
                res.writeHead(400, { 'Content-type': 'text/html' });
                res.end('<h1>Invalid JSON data</h1>');
            }
        });
    }

    // Task 9
    else if (req.method === 'POST' && parsedUrl.pathname === '/xml') {
        let xmlData = '';

        req.on('data', (chunk) => {
            xmlData += chunk;
        });

        req.on('end', () => {
            xml2js.parseString(xmlData, (err, result) => {
                if (err) {
                    res.writeHead(400, { 'Content-type': 'text/html' });
                    res.end('<h1>Invalid XML data</h1>');
                } else {
                    const request = result.request;
                    const requestId = request.$.id;

                    const xElements = request.x || [];
                    const xSum = xElements.reduce((sum, x) => sum + parseInt(x.$.value || 0), 0);

                    const mElements = request.m || [];
                    const mConcat = mElements.map(m => m.$.value).join('');

                    const response = {
                        response: {
                            $: { id: 33, request: requestId },
                            sum: [{ $: { element: 'x', result: xSum } }],
                            concat: [{ $: { element: 'm', result: mConcat } }]
                        }
                    };

                    const builder = new xml2js.Builder();
                    const responseXML = builder.buildObject(response);

                    res.writeHead(200, { 'Content-type': 'application/xml' });
                    res.end(responseXML);
                }
            })
        })
    }


    // Task 10
    else if (req.method === 'GET' && parsedUrl.pathname === '/files') {
        const staticDirectory = './static';

        fs.readdir(staticDirectory, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-type': 'text/html' });
                res.end('<h1>Internal Server Error</h1>');
            } else {
                res.writeHead(200, { 'X-files-count': files.length, 'Content-type': 'text/html' });
                res.end(`Number of files in directory static is ${files.length}`);
            }
        });
    }

    // Task 11
    else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/files/')) {
        const filename = url.parse(req.url).pathname.split('/')[2];

        const filePath = path.join(__dirname, 'static', filename);

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-type': 'text/html' });
                res.end('<h1>File Not Found</h1>');
            } else {
                res.end(fs.readFileSync(`static/${filename}`));
            }
        });
    }

    // Task 12
    else if (req.method === 'GET' && req.url === '/upload') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(`
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="Upload">
      </form>
    `);
    }

    else if (req.method === 'POST' && req.url === '/upload') {
        const form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-type': 'text/html' });
                res.end('<h1>Internal Server Error</h1>');
                return;
            }

            if (files.file && files.file.length > 0) {
                const uploadedFile = files.file[0];

                const savePath = './static/' + uploadedFile.originalFilename;

                fs.rename(uploadedFile.path, savePath, (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-type': 'text/html' });
                        res.end('<h1>Internal Server Error</h1>');
                        return;
                    }

                    res.writeHead(200, { 'Content-type': 'text/html' });
                    res.end('<h1>File uploaded successfully</h1>');
                });
            } else {
                res.writeHead(400, { 'Content-type': 'text/html' });
                res.end('<h1>No file uploaded</h1>');
            }
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Not Found</h1>');
    }

});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
