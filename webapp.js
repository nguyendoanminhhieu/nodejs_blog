const http = require("http");
const dt = require('./mymodule')
const port = 3000;
const hostname = "localhost";

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html")

    switch (req.url) {
        case "/home":
            res.writeHead(200);
            res.end("<h1>This is Home Page</h1>");
            break;
        case "/about":
            res.writeHead(200);
            res.end("<h1>This is About Page</h1>");
            break;
        case "/calc":
            res.writeHead(200);
            res.end(`<h1>This is Calculator Page ${dt.calc(10,200,"+")} <h1>`);
        default:
            res.end("<h1>Hello World</h1> <p>This is HTML response</p><ol><li>One</li><li>Two</li><li>Three</li></ol>");
            break;
    }
});

server.listen(port, hostname, () => {
    console.log('Server running at http://$(hostname):${port}/');
});