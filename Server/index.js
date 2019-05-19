var express = require('express');
//var config = require('config');
var bodyParser = require('body-parser');
var tediousExpress = require('express4-tedious');



var app = express();

app.get('/', (req, res) => {
  console.log("GET");
  res.json({"foo": "bar"});
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Add route code Here
app.post('/listen', (req, res) => {
  console.log("Recieved " + JSON.stringify(req.body));
  if (Object.keys(req.body).length < 6 ){
    console.log("under 6, going to return the whole body");
    res.json(req.body);
  } else {
    console.log("over 6, going to return first 6");
    
  }
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
