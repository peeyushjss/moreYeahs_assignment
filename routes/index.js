/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();

/* POST API for storing the availability of User. */
router.post('/availability', function (req, res, next) {
    const availabilityDB = req.availability;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let userId = req.body.userId;

    if (startTime && endTime && userId) {
        let availabilityData = new availabilityDB({
            startTime: startTime,
            endTime: endTime,
            userId: userId
        });
        availabilityData.save(function (err, result) {
            if (err) {
                req.json_op_status = 0;
                req.json_op_message = err;
                next();
            } else {
                req.json_op_status = 1;
                req.json_op_message = 'Success!';
                next();
            }
        });
    } else {
        req.json_op_status = 0;
        req.json_op_message = 'Fill all fields!';
        next();
    }

});

/* GET API for getting the availability of User. */
router.get('/availability', function (req, res, next) {

});

module.exports = router;