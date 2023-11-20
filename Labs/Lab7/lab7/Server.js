const http = require('http');
const url = require('url');
const xml2js = require('xml2js');
const fs = require('fs');
const mp = require('multiparty')

http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end();
    }

    else if (parsedUrl.pathname === '/params') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        let x = parsedUrl.query.x;
        let y = parsedUrl.query.y;
        res.end(`x = ${x}, y = ${y}`);
    }

    else if (parsedUrl.pathname === '/postRequest') {
        let data = '';
        req.on("data", (chunk) => {
            data += chunk;
        })

        req.on('end', () => {
            let postData = JSON.parse(data);
            let x = postData.x;
            let y = postData.y;
            let s = postData.s;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`x = ${x}, y = ${y}, s = ${s}`);
        });
    }

    else if (parsedUrl.pathname === '/jsonRequest') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            data = JSON.parse(data);
            res.writeHead(200, {'Content-type': 'application/json'});
            let comment = 'Response. Lab 8/10';
            let resp = {};
            resp.__comment = comment;
            resp.x_plus_y = data.x + data.y;
            resp.Concatenation_s_o = data.s + ': ' + data.o.surname + ', ' + data.o.name;
            resp.Length_m = data.m.length;
            res.end(JSON.stringify(resp));
        });
    }

    else if (parsedUrl.pathname === '/xmlRequest') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            xml2js.parseString(data, (err, result) => {
                res.writeHead(200, {'Content-type': 'application/xml'});
                let id = result.request.$.id;
                let sum = 0;
                let concat = '';
                result.request.x.forEach((p) => {
                    sum += parseInt(p.$.value);
                });
                result.request.m.forEach((p) => {
                    concat += p.$.value;
                });

                let response = `<response id="33" request="${id}"><sum element="x" result="${sum}"/><concat element="m" result="${concat}"/></response>`;
                res.end(response);
            });
        });
    }

    else if (parsedUrl.pathname === '/photoUpload') {
        let data = '';
        let form = new mp.Form({uploadDir: './static'});

        form.on('field', (name, field) => {
            console.log(field);
            data += `'${name}' = ${field}`;
        });

        form.on('file', (name, file) => {
            console.log(name, file);
            data += `'${name}': Original filename – ${file.originalFilename}, Filepath – ${file.path}`;
        });

        form.on('error', (err) => {
            res.writeHead(500, {'Content-Type': 'text/html'});
            console.log('error', err.message);
            res.end('Form error.');
        });

        form.on('close', () => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('Form data:');
            res.end(data);
        });

        form.parse(req);
    }

    else if (parsedUrl.pathname === '/photoDownload') {
        res.writeHead(200, {'Content-type': 'text/html'});
        let file = fs.readFileSync('./static/photo.png');
        res.end(file);
    }

}).listen(5000);

console.log('Server is working on http://localhost:5000');