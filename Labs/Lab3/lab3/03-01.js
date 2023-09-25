http = require('http');

let currentState = 'norm';

http.createServer((req, res) => {
    res.writeHead(200, {'Content-type' : 'text/html; charset=utf-8'});
    res.end(`<h1>${currentState}</h1>`);
}).listen(5000);

console.log("The app is running on http://localhost:5000");

process.stdin.setEncoding('utf8');
process.stdout.write(currentState + "->");
process.stdin.on('readable', () => {
    let chunk = null;
    while((chunk = process.stdin.read()) !== null) {
        switch (chunk.trim()) {
            case "exit":
                process.exit(0);
                break;
            case "norm":
            case "idle":
            case "stop":
            case "test":
                process.stdout.write("reg = " + currentState + " --> " + chunk);
                currentState = chunk.trim();
                break;
            default:
                process.stdout.write(chunk);
        }
        process.stdout.write(currentState + "->");
    }});