const express = require('express');
const ejs = require('ejs');
const pug = require('pug');
const Joi = require("joi");
const fobj = require('fs');
const mongoose = require('mongoose');
const number = require('joi/lib/types/number');
const json2html = require('node-json2html');
const bodyParser = require('body-parser');
const studentFN = "./studentdata.txt";
const router = express.Router();
var students = [];
var dbConnected = false;

router.use(express.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('',(req,res)=>{
    ejs.renderFile(__dirname + '/stuPage.ejs',{statusA: dbConnected})
        .then((htmlStr)=>{
            console.log(htmlStr);
            res.send(htmlStr);
        })
        .catch((err)=>{res.send(err.message)});
    
});


router.get('/connectDB',(req,res) => {
    const uriCluster0 = 'mongodb+srv://lyhuehuan:lyhuehuan123@cluster0.kgyqjwp.mongodb.net/test1';
    mongoose.connect(uriCluster0)
    .then(() => {
        res.status(200).send("Connected to mongoDB");
        dbConnected = true;
    })
    .catch(err => {
        console.error('Could not connect to MongoDB',err)
        res.status(200).send(`Could not connect to MongoDB $(err)`);
    })
//    console.log('Successfully creating model');
});

const studentSchema = new mongoose.Schema({
    name: String,
    DayOfBirth: Number,
    MonthOfBirth: Number,
    YearOfBirth: Number 
});
const myStuCollection = 'teststudent'; 
const StudentClass = mongoose.model(myStuCollection,studentSchema);

router.get('/load', (req,res) => {
    try{
    StudentClass.find().lean()
    .then((dbStudent) => {
        console.log(dbStudent);
        writeHtmlFromScoresJson(dbStudent,'table.ejs');
        ejs.renderFile(__dirname + '/student/view/loadStudent.ejs',{dirname:__dirname})
                .then((htmlStr)=> res.send(htmlStr))
                .catch(error => res.send(error));
    //   res.send(html);
    //     res.status(200).send(html);
    });
    }
    catch(err) {
        res.status(400).send('Student file does not exists.');
    }
});

function writeHtmlFromScoresJson(jsonFile, htmlTableFile) {
    let template_table_header = {
        "<>": "tr", "html": [
            {"<>": "th", "html": "name"},
            {"<>": "th", "html": "DayOfBirth"},
            {"<>": "th", "html": "MonthOfBirth"},
            {"<>": "th", "html": "YearOfBirth"}
        ]
    }
    
    let template_table_body = {
        "<>": "tr", "html": [
            {"<>": "td", "html": "${name}"},
            {"<>": "td", "html": "${DayOfBirth}"},
            {"<>": "td", "html": "${MonthOfBirth}"},
            {"<>": "td", "html": "${YearOfBirth}"}
        ]
    }
    
    let data = jsonFile;
    let table_header = json2html.transform(data[0], template_table_header);
    let table_body = json2html.transform(data, template_table_body);
    //let header = '<!DOCTYPE html>' + '<html lang="en">\n' + '<head><title>Lighthouse Report</title></head>'
    let body = '<table id="my_table">\n<thead>' + table_header + '\n</thead>\n<tbody>\n' + table_body + '\n</tbody>\n</table>'
    //body = '<body>' + body + '</body>'
    let htmlStr = body;
    fobj.writeFileSync(__dirname+ '/student/view/' + htmlTableFile,htmlStr);
    return htmlStr;
}


router.get('/newsave', (req,res) => {
    try{
        fobj.writeFileSync(studentFN,JSON.stringify(students));
        res.status(200).send('The students data is successfully save to file');
    }catch(err) {
        res.status(400).send('Error Ocurred');
    }
});

router.get('/append',(req,res) => {
    res.status(200).sendFile(__dirname + '/appendPage.html');
});

router.post('/append',(req,res) => {
    console.log(req.body);
    const student = {
        name: req.body.name,
        DayOfBirth: req.body.dob,
        MonthOfBirth: req.body.mob,
        YearOfBirth: req.body.yob 
    }
    const {error} = checkValidation2(student);
    if (error) return res.status(400).send(`Bad Json input ${error}`);
    else {
        // res.status(200).send('The JSON input is ok!');
    }
    StudentClass
        .find(student)
        .then((dupstudents) => {
            console.log(dupstudents);
            if (dupstudents.length == 0){
                const studentdata = new StudentClass(student);
                studentdata.save()
                    .then(result => console.log(result));
                res.status(200).send('Successfully input student ' + student + ' to the data');
            }else {
                res.status(400).send('This student already exist: ' + dupstudents);
            }
        });
});

function checkValidation(day, month, year){
    if (year <= 1850 || year >= 2024) {
        return false;
    }
    if (month < 1 || month > 12){
        return false;
    }
    switch (month){
        case 1,3,5,7,8,10,12:
            if (day < 1 || day >31){
                return false;
            }
            break;
        case 2: 
            if (day < 1 || day > 29){
                return false;
            }
            break;
        default:
            if (day < 1 || day > 30){
                return false;
            }
    }
    return true;
}

function checkValidation2(student) {
    const schema = {
        name: Joi.string().min(1).max(30).required(),
        DayOfBirth: Joi.number().integer().min(1).max(31).required(),
        MonthOfBirth: Joi.number().integer().min(1).max(12).required(),
        YearOfBirth: Joi.number().integer().min(1900).max(2023).required()
    }
    const result = Joi.validate(student,schema);
    if (result.error) return result;

    const schema2 = {
         date: Joi.date().required()
    }
    const result2 = Joi.validate({"date": Date.parse(`${student.YearOfBirth}-${student.MonthOfBirth}-${student.DayOfBirth}`)},schema2);
    return result2;
};

router.get('/:name/:DayOfBirth/:MonthOfBirth/:YearOfBirth',(req,res) => {
    var DayOfBirth, MonthOfBirth,YearOfBirth;
    DayOfBirth = parseInt(req.params.DayOfBirth);
    MonthOfBirth = parseInt(req.params.MonthOfBirth);
    YearOfBirth = parseInt(req.params.YearOfBirth);

    var myJSONobj = {
        "name": req.params.name,
        "DayOfBirth": req.params.DayOfBirth,
        "MonthOfBirth": req.params.MonthOfBirth,
        "YearOfBirth": req.params.YearOfBirth
    }

    if (!checkValidation(DayOfBirth, MonthOfBirth, YearOfBirth)) {
        res.send('Birthday is invalid! Please input again');
    }else {
        const dupstudents = students.find(e => {
            return e.name == myJSONobj.name &&
            e.DayOfBirth == myJSONobj.DayOfBirth &&
            e.MonthOfBirth == myJSONobj.MonthOfBirth &&
            e.YearOfBirth == myJSONobj.YearOfBirth;
        });

        if (!dupstudents){
            students.push(myJSONobj);
            res.status(200).send('Successfully input student');
        }else
            res.status(400).send('This student is already existed');

       
    }
});

router.get('/',(req,res) => {
    res.status(200).send(students);
});

module.exports = router;
module.exports.chkValidDate = checkValidation2;


