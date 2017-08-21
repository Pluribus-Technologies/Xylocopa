'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./services/routes/index');
var mongoUrl = process.env["MONGODB"] || 'mongodb://localhost/pluribus';

var app = express();
// Set up mongo
app.mongoose = require('mongoose');
app.db = app.mongoose.connection;

//parsers
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride('_method', {
    methods: ["POST", "GET", "DELETE", "PUT"]
}));

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});

app.db.on('error', console.error.bind(console, 'connection error:'));
app.db.once('open', function() {
    console.log("Connected succesfully to MongoDB at " + mongoUrl);
    // nodeJS listening on port 4000
    app.listen(4000, () => {
        console.log('listening on 4000');
    });
    routes.connect();
});

app.mongoose.connect(mongoUrl, { useMongoClient: true });

module.exports = app;
