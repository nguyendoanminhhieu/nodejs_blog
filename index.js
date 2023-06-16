const express = require("express");
const app = express();
const router = express.Router();
const fobj = require('fs');
const stuM = require("./studentM");
const course = 
[
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
];
app.use('/api/course/students', stuM);
app.use(express.json());


// router.get('/api/nonblocking', (req,res) => {
//     var d = 10;
//     // setTimeout(() => {
//     //     console.log('count:', add(5,5))
//     // },5000);
//     d = await add(20,10);
//     console.log('Hello World');
//     res.send('test nonblocking');
//     console.log('Value of d: ', d);
// })

// function add(a,b){
//     var c = 0;
//     setTimeout(() => {c = a + b ; return c;}, 2000)
//     return c;
// }

router.get('/home', (req,res) => {
    res.set('Content-Type','text/html');
    res.status(200).send('<h1>Hello World, This is home router</h1>');
});   

router.get('/about', (req,res) => {
    res.set('Content-Type','text/html');
    res.status(200).send('<h1>Hello World, This is about router</h1>');
});

router.get('/literature', (req,res) => {
    res.set('Content-Type','text/plain');
    const fcontent = fobj.readFileSync('./alice.txt');
    res.status(200).send(fcontent.toString());
});
   

app.use('/', router);
const port = process.env.port || 3000;
app.listen(port);
console.log('Web Server is listening at port ' + port);
