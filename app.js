const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/db.js');
const cors = require('cors');

const index = require('./routes/index');
const app = express();

app.listen(9000);

console.log(" Application is running on PORT 9000");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(db());
app.use(cors());

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    if (typeof req.json_op_status !== 'undefined') {
        if (req.json_op_status === 0) {
            res.json({
                'status': req.json_op_status,
                'message': req.json_op_message
            });
        } else {
            res.json({
                'status': req.json_op_status,
                'message': req.json_op_message,
                'data': req.json_op_data
            });
        }
    }
    next();
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ status: 500, message: 'error' });
});

module.exports = app;