'use strict';
var models = require('../../db/schema');

function sendError(errorCode, res, err, message) {
    res.status(errorCode).json({
        title: message,
        message: err.message,
        error: err
    });
}
exports.getAllAccounts = function(req, res, next) {
    console.log('getAllAccounts');
    models.getAllAccounts(function(err, accounts) {
        if (err) {
            sendError(400, res, err, 'Failed on getAllAccounts');
        }
        res.json(accounts);
    });
}

exports.getAccountById = function(req, res, next) {
    console.log('getAccountById ' + req.params.id);
    models.getAccountById(req.params.id, function(err, accounts) {
        if (err) {
            sendError(404, res, err, 'Failed on getAccountById');
        }
        res.json(accounts);
    });
}

exports.removeAccountById = function(req, res, next) {
    console.log('removeAccountById ' + req.params.id);
    models.removeAccountById(req.params.id, function(err, accounts) {
        if (err) {
            sendError(400, res, err, 'Failed on removeAccountById');
        }
        res.json(accounts);
    });
}

exports.createAccount = function(req, res, next) {
    console.log('createAccount ' + req.body.organization);
    models.createAccount(req.body, function(err, accounts) {
        if (err) {
            sendError(400, res, err, 'Failed on createAccount');
        }
        res.json(accounts);
    });
}

exports.updateAccount = function(req, res, next) {
    console.log('updateAccount ' + req.params.id);
    models.updateAccount(req.params.id, req.body, function(err, accounts) {
        if (err) {
            sendError(400, res, err, 'Failed on updateAccount');
        }
        res.json(accounts);
    });
}