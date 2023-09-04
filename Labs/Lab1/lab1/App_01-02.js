let http = require('http');

let h = (r)=>{
    let rc = '';
    for (key in r.headers) rc += '<h3>' + key + ':' + r.headers[key] + '</h3>';
    return rc;
};

http.createServer(function (req, res){
    let b = '';
    req.on('data', str => {b += str; console.log('data', b)})
    res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
    req.on('end', () => res.end(
        '<!DOCKTYPE html> <html><head></head>' +
        '<body>' +
        '<h1>Структура запроса</h1>' +
        '<h2>' + 'метод: ' + req.method +'</h2>' +
        '<h2>' + 'uri: ' + req.url + '</h2>' +
        '<h2>' + 'версия: ' + req.httpVersion + '</h2>' +
        '<h2>' + 'Заголовки: ' + '</h2>' + h(req) +
        '<h2>' + 'тело: ' + b + '</h2>' +
        '</body>' +
        '</html>'
    ))
}).listen(3000);

console.log('Server is running at http://localhost:3000/');