const express = require('express');
const fs = require('fs');
const app = express();
const csvToJson = require('convert-csv-to-json');


app.use((req, res, next) => {
    console.log(req.get('user-agent') + ',' + new Date().toISOString() + ',' + req.method + ',' + req.url + ',HTTP/' + req.httpVersion + ',' + res.statusCode)
    fs.appendFile('./log.csv', req.get('user-agent') + ',' + new Date().toISOString() + ',' + req.method + ',' + req.url + ',HTTP/' + req.httpVersion + ',' + res.statusCode + '\n')

    next();


});

app.get('/', (req, res) => {
    res.send('ok');
});

app.get('/logs', (req, res) => {
    var poo = require('../output.json');
    console.log({poo});
    let log = './log.csv';
    let jsonLog = 'output.json';

    csvToJson.generateJsonFileFromCsv(log, jsonLog);

    csvToJson.fieldDelimiter(',').getJsonFromCsv(log);
    
 
    res.status(200);

    res.json(poo);
});

module.exports = app;