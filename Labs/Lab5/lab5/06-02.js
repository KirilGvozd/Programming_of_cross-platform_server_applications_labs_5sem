const http = require('http');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'someEmail',
        pass: 'somePassword'
    }
});

http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Отправка HTML-страницы с формой
        fs.readFile(path.join(__dirname, '06-02.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Ошибка чтения файла');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/send') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = querystring.parse(body);
            const { from, to, message } = formData;

            const mailOptions = {
                from,
                to,
                subject: 'New message',
                html: `<p>${message}</p>`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                if (error) {
                    console.log(error);
                    res.end('Ошибка отправки письма.');
                } else {
                    console.log('Email отправлен: ' + info.response);
                    res.end('Письмо успешно отправлено.');
                }
            });
        });
    }
}).listen(5000);

console.log(`Server is running at http://localhost:5000`);
