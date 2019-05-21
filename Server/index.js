var express = require('express');
//var config = require('config');
var bodyParser = require('body-parser');
var tediousExpress = require('express4-tedious');
// My created class
var User = require('./user');

let a = new User("a","b");
a.printit();

var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Route code 
app.post('/listen', (req, res) => {
  console.log("Recieved " + JSON.stringify(req.body));
  let contacts_arr = parserJSON(JSON.stringify(req.body));

  //if (Object.keys(req.body).length < 6 ){
    if (contacts_arr.length <= 6 ){
    console.log("under 6, going to return the whole body");
    res.json(req.body);
  } else {
    console.log("over 6, going to return first 6");
    console.log(contacts_arr);
  }
  res.json({"foo": "bar"});
});

function parserJSON(json){
  var obj = JSON.parse(json);
  console.log("------------------------------------------------");
  console.log(obj);
  console.log(obj.contacts);
  var arr = new Array();
  for (i in obj){
    console.log("=----entered for i in obj----- ");
    const user_temp = new User(obj.contacts.name, obj.contacts.phone_num);
    console.log(user_temp);
    arr.concat(user_temp);
  }
  return arr;
}

//Connecting to local SQL 
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
console.log('dotenv connected to .env');


//Attempt to conenct 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
console.log('starting to connect to db');

pool.on('connect', () => {
  console.log('connected to the db');
});


//Access to another file that has the sql code
app.use(bodyParser.text()); 
app.use('/sql', require('./routes/sql'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
    err.status = 404;
    next(err);
});

//Set up port
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
