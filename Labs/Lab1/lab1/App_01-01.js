let http= require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('<h1>Hello World!</h1>\n');

}).listen(3000);

console.log('Server is running at http://localhost:3000/');