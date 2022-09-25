const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'maze.html'), (err, content) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
    })}

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'maze.html' : req.url);

    let extname = path.extname(filePath);

    let contentType = 'text/html';

    switch(extname) {
        case '.js' :
            contentType = 'text/javascript';
            break;
        case '.css' :
            contentType = 'text/css';
            break;
        case '.json' :
            contentType = 'application/json';
            break;
        case '.jpg' :
            contentType = 'image/jpg';
            break;
        case '.png' :
            contentType = 'image/pgn';
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                res.writeHead(200, { 'Content-Type': 'text/html'});
                res.end(content, 'utf8');
                });
            } else {
                res.writeHead(500);
                res.end('Sever ErrorL ${err.code}');
            } 
        } else {
            res.writeHead(200, { 'Content-Type' : contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));