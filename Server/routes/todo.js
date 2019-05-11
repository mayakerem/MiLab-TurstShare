var router = require('express').Router();
var TYPES = require('tedious').TYPES;
var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET all drivers. */
router.get('/drivers', function (req, res) {

    req.sql("select * from drivers_db for json path")
        .into(res, '[]');
});

/* GET a driver with id as a phone number. */
router.get('/drivers/', function (req, res) {
    
    req.sql("select * from drivers_db where drivers_db.DriverID = @id for json path, without_array_wrapper")
        .param('id', req.params.id, TYPES.Int)
        .into(res, '{}');
});

/* POST add a ride. */
router.post('/drivers/:id/:name/:riderid', function (req, res) {
    console.log("Received save post request from");
    console.log(request.body);
    // TODO send post request in body
    
    var jsonRequest = request.body;
    var jsonResponse = {};

    jsonResponse.result = jsonRequest.val1 + jsonRequest.val2;

    response.send(jsonResponse);

    req.sql("INSERT INTO drivers_db (DriverID, DriverName, RiderID) VALUES (@id, @name, @riderid)")
        .param('id', 'name', 'riderid', req.body, TYPES.NVarChar)
        .exec(res);
});

/* GET all phonecontacts. */
router.get('/phonecontacts', function (req, res) {

    req.sql("select * from phonecontacts_db for json path")
        .into(res, '[]');
});

/* GET all the phonecontacts from user id */
router.get('/phonecontacts/:id', function (req, res) {
    
    req.sql("select * from phonecontacts_db where phonecontacts_db.ownerid = @id for json path, without_array_wrapper")
        .param('id', req.params.id, TYPES.Int)
        .into(res, '{}');
});

/* POST add a ride. */
router.post('/phonecontacts/:id/:contact/:contactid', function (req, res) {
    
    req.sql("INSERT INTO phonecontacts (ownerid, contactname, contactid) VALUES (@id, @contact, @contactid)")
        .param('id', 'contact', 'contactid', req.body, TYPES.NVarChar)
        .exec(res);
});


// /* PUT update task. */
// router.put('/:id', function (req, res) {
    
//     req.sql("exec updateDrivers @id, @drivers_db")
//         .param('id', req.params.id, TYPES.Int)
//         .param('drivers_db', req.body, TYPES.NVarChar)
//         .exec(res);

// });

// /*  . */
// router.delete('/:id', function (req, res) {
    
//     req.sql("delete from drivers_db where id = @id")
//         .param('id', req.params.id, TYPES.Int)
//         .exec(res);

// });

module.exports = router;