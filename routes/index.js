/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();

/* POST API for storing the availability of User. */
router.post('/availability', function (req, res, next) {
    const availabilityDB = req.availability;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let userId = req.body.userId;

    /* Checking all fields are available or not */
    if (startTime && endTime && userId) {
        let availabilityData = new availabilityDB({
            startTime: startTime,
            endTime: endTime,
            userId: userId
        });
        availabilityData.save(function (err) {
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
    const availabilityDB = req.availability;
    let userId = req.query.userId,
        output = [];

    if (userId) {
        availabilityDB.find({
            userId: userId
        }, function (error, result) {
            if (error) {
                req.json_op_status = 0;
                req.json_op_message = error;
                next();
            } else {
                result.sort(function (l, m) {
                    return l.s - m.s
                })
                /* Adding first object as it is to desired output */
                output.push(result[0]);
                for (let iterator = 1; iterator < result.length; iterator++) {
                    var finalArrLength = output.length;
                    /* Comparing sorted array's last element's end time to start time of iterating array object */
                    if (result[iterator].s <= output[finalArrLength - 1].e) {
                        /* If true then remove last object of final array and push new object according to new time slot */
                        let tempObj = {};
                        tempObj.s = output[finalArrLength - 1].s;
                        tempObj.e = result[iterator].e;
                        output.pop();
                        output.push(tempObj);
                    }
                    else {
                        output.push(result[iterator]);
                    }
                }
                req.json_op_status = 1;
                req.json_op_message = 'Success!';
                req.json_op_data = output;
                next();
            }
        });
    } else {
        req.json_op_status = 0;
        req.json_op_message = 'User Id missing!';
        next();
    }

});

module.exports = router;