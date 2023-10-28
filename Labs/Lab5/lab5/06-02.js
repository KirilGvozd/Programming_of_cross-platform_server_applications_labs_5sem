const http = require('http');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'kirillgvozd0@gmail.com',
        pass: 'qqhu bkrt hzvo exkp'
    }
});

http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('06-02.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Error reading the file.');
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
                    res.end('Failed to send a message.');
                } else {
                    console.log('Email отправлен: ' + info.response);
                    res.end('Letter is sent successfully.');
                }
            });
        });
    }
}).listen(3000);

console.log(`Server is running at http://localhost:3000`);
