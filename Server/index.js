let express = require('express');
//var config = require('config');
let bodyParser = require('body-parser');
let tediousExpress = require('express4-tedious');
// My created class
let User = require('./user');

let a = new User("a","b");
a.printit();

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Route code 
app.post('/listen', (req, res) => {
  console.log("Recieved " + JSON.stringify(req.body));
  let contacts_arr = parserJSON(JSON.stringify(req.body));

  //if (Object.keys(req.body).length < 6 ){
    if (req.body.contacts.length <= 6 ){
    console.log("under 6, going to return the whole body");
    res.json(req.body);
  } else {
    console.log("over 6, going to return first 6");
    let random_arr = randomUniqueContacts(req.body.contacts);
    res.json({random_arr});
  }
  console.log("sent - " - res.body);
});

//Function that parses the JSON into an array of type User
function parserJSON(json){
  let obj = JSON.parse(json);
  let arr = new Array();
  for (i in obj.contacts){
    const user_temp = new User(obj.contacts[i].name, obj.contacts[i].phone_num);
    arr.concat(user_temp);
  }
  return arr;
}

//Function that returns 6 random
function randomUniqueContacts(original_arr){
  let unique_arr = original_arr.filter(unique);
  let unique_arr_six = new Array();
  let i = 0;
  while (i < 6){
    unique_arr_six[i] = unique_arr[i];
    i++;
  }
  return unique_arr_six;
}

// function print(arr){
//   let str = " ";
//   for (i in arr){
//     str = str + arr[i].name + " - ";
//   }
//   return str;
// }


//Unique user id
const unique = (value, index, self) => {
  return self.indexOf(value) === index
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
