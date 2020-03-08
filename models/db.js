/* jshint esversion: 6 */

module.exports = function () {

    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/moreYeahsAssignment');

    const conn = mongoose.connection;

    let model_schema_availability = mongoose.Schema({
        startTime: String,
        endTime: String,
        userId: String
    });

    let CollectionModel_availability = conn.model('availability', model_schema_availability);

    conn.on('error', function (err) {
        console.log(" Error in database connection: ", err);
        process.exit();
    });

    return function (req, res, next) {
        req.mongo = conn;
        req.availability = CollectionModel_availability;
        next();
    };
};