const http = require("http");
const dt = require('./mymodule')
const port = 3000;
const hostname = "localhost";
const fobj = require('fs');

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
            break;

        case"/literature":
            res.writeHead(200, "Content-Type","text/plain");
            const fcontent = fobj.readFileSync('./alice.txt');
            res.write(`${fcontent.toString()}`);
            res.end("THIS IS THE END OF THE STORY");
            break;

        case"/literature2":
            res.writeHead(200, "Content-Type","text/plain");
            fobj.readFile('./alice.txt',(err,data) => 
            {
                res.write(data.toString());
            });
            break;

        case"/literature3":
            var txt = "we are using writeFile";
            res.writeHead(200, "Content-Type","text/plain");
            fobj.writeFile('./alice.txt',txtdata, 'r+', (err) => 
            {
                res.end(data.toString());
            });
            break;

        case"/openfile":
            var buff = new Buffer.alloc(100);
            fobj.open('./alice.txt','r',(err,fd) => {
            if (err){
                return console.log(err.message);
            } else {
                fobj.read(fd,buff,0, buff.length,0,() => {return;});
                res.write("We read file");
                res.write(buff);
                res.end();
            }
            }); 
            break;

        case "/writefile":
            var buff = new Buffer.alloc(100);
            buff = "We are now create and write file";
            fobj.open('./alice.txt','r+',(err,fd) => {
            if (err){
                return console.log(err.message);
            } else {
                fobj.read(fd,buff,0, 'utf-8',() => {return;});
                res.write("We write file");
                res.end();
            }
            }); 
            break;

        default:
            res.end("<h1>Hello World</h1> <p>This is HTML response</p><ol><li>One</li><li>Two</li><li>Three</li></ol>");
            break;
    }
});

server.listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});