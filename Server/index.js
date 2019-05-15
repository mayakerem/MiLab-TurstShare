var express = require('express');
//var config = require('config');
var bodyParser = require('body-parser');
var tediousExpress = require('express4-tedious');


var app = express();

app.get('/', (req, res) => {
  console.log("Got GET REQUEST from CLIENT");
  res.json({"foo": "bar"});
});

// Add route code Here
 app.post('/', (req, res) => {
  console.log("Got POST REQUEST from CLIENT");
  res.json({"foo": "bar"});
});


//Connecting to local SQL 
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
console.log('dotenv connected to .env');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
console.log('starting to connect to db');

pool.on('connect', () => {
  console.log('connected to the db');
});


app.use(bodyParser.text()); 
app.use('/sql', require('./routes/sql'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
    err.status = 404;
    next(err);
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
