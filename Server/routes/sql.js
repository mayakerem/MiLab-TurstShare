var router = require('express').Router();
var TYPES = require('tedious').TYPES;
var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET all rides. */
router.get('/rides', function (req, res) {
//     const findAllQuery = 'SELECT * FROM reflections';
//     try {
//       const { rows, rowCount } = await db.query(findAllQuery);
//       return res.status(200).send({ rows, rowCount });
//     } catch(error) {
//       return res.status(400).send(error);
//     }
// },
   
   
    req.sql("select * from rides for json path")
        .into(res, '[]');
});

/* GET a driver with id as a phone number. */
router.get('/rides/', function (req, res) {
    
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

module.exports = router;