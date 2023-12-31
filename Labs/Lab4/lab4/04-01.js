const http = require('http');
const fs = require('fs');
const url = require('url');
const database = require('./DB')

let db = new database.DB();

db.on('GET', (req, res) => {
    console.log('DB GET');
    db.select().then((results) => {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(results));
    });
});

db.on('POST', (req, res) => {
    console.log('DB POST');
    req.on('data', (data) => {
        let r = JSON.parse(data);

        if (r.id === '' || r.name === '' || r.bday === '') {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({error: 'Fields cannot be empty!'}));
            return;
        }

        if (!checkDate(r.bday)) {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({error: 'Birthdate can\'t be more, than today\'s date!'}));
            return;
        }

        db.insert(r).then(data => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        }).catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(err));
        });
    });
});

db.on('PUT', (req, res) => {
    console.log('DB PUT');
    req.on('data', (data) => {
        let r = JSON.parse(data);

        if (r.id === '' || r.name === '' || r.bday === '') {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({error: 'Fields cannot be empty!'}));
            return;
        }

        db.update(r).then(data => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        }).catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(err));
        });

    });
});

db.on('DELETE', (req, res) => {
    console.log('DB DELETE');
    req.on('data', (data) => {
        let r = JSON.parse(data);

        if (r.id === '' || r.name === '' || r.bday === '') {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({error: 'Fields cannot be empty!'}));
            return;
        }

        db.delete(r.id).then((data) => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        }).catch((err) => {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify( err));
        });
    });
});


http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/') {
        let html = fs.readFileSync("./04-01.html", 'utf8');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.end(html);
    } else if (url.parse(req.url).pathname === "/api/db") {
        db.emit(req.method, req, res);
    }
}).listen(5000, () => console.log('Server is running at http://localhost:5000'));

let checkDate = (date) => {
    let pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
    let new_date = date.replace(pattern,'$3-$2-$1');
    return new Date(date) <= new Date();
}