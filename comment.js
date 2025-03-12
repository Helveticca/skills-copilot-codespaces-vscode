// Create web server
// 1. Load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// 2. Create web server
http.createServer(function (req, res) {
    // 2.1 Get URL
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);

    // 2.2 Get request
    if (pathname === '/') {
        // 2.2.1 Read file
        fs.readFile('comment.html', 'utf-8', function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathname === '/comment') {
        // 2.2.2 Get POST data
        req.setEncoding('utf-8');
        req.on('data', function (data) {
            var query = qs.parse(data);
            console.log(query);

            // 2.2.3 Write comment
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>' + query.comment + '</h1>');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
    }
}).listen(1337, '