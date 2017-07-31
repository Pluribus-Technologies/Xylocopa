import React, { Component } from 'react';
import express
import logo from './PluribusLogo.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>The Pluribus Project</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require('./routes/index');
var methodOverride = require('method-override');

var app = express();
// Set up mongo
app.mongoose = require('mongoose');
app.db = app.mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));
app.use(cookieParser());

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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.db.on('error', console.error.bind(console, 'connection error:'));
app.db.once('open', function() {
    console.log("Connected succesfully to MongoDB");
    routes.connect();
});

// module.exports = app;
// this module export above is for node to mongo. 
export default App;
