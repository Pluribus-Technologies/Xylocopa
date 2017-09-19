/*jslint node: true */
'use strict';
var get = require('lodash/get');
var models = require('../../db/schema');

function sendError(errorCode, res, err, message) {
    res.status(errorCode).json({
        title: message,
        message: get(err, err.message, ''),
        error: err
    });
}

exports.getAllAccounts = function(req, res, next) {
    console.log('getAllAccounts');
    models.getAllAccounts(function(err, accounts) {
        if (err) {
            sendError(500, res, err, 'Failed on getAllAccounts');
            return next;
        }
        res.status(200).json(accounts);
    });
};

exports.getAccountById = function(req, res, next) {
    if (!req.params || !req.params.id) {
        sendError(404, res, '', 'Account not found');
        return next;
    }
    console.log('getAccountById ' + req.params.id);
    models.getAccountById(req.params.id, function(err, account) {
        if (err) {
            sendError(500, res, err, 'Failed on getAccountById');
            return next;
        }
        if (!account) {
            sendError(404, res, '', 'Account not found');
            return next;
        }
        res.status(200).json(account);
    });
};

exports.removeAccountById = function(req, res, next) {
    if (!req.params || !req.params.id) {
        sendError(404, res, '', 'Account not found');
        return next;
    }
    console.log('removeAccountById ' + req.params.id);
    models.removeAccountById(req.params.id, function(err, account) {
        if (err) {
            sendError(500, res, err, 'Failed on removeAccountById');
            return next;
        }
        if (!account) {
            sendError(404, res, '', 'Account not found');
            return next;
        }
        res.status(200).json(account);
    });
};

exports.createAccount = function(req, res, next) {
    if (!req.body) {
        sendError(400, res, '', 'body message is required');
        return next;
    }
    var organization = get(req, 'body.organization', null);
    if (!organization) {
        sendError(400, res, '', 'organization is required');
        return next;
    }
    console.log('createAccount ' + req.body.organization);
    models.createAccount(req.body, function(err, accounts) {
        if (err) {
            sendError(500, res, err, 'Failed on createAccount');
            return next;
        }
        res.status(200).json(accounts);
    });
};

exports.updateAccount = function(req, res, next) {
    if (!req.params || !req.params.id) {
        sendError(404, res, '', 'Account not found');
        return next;
    }
    console.log('updateAccount ' + req.params.id);
    models.updateAccount(req.params.id, req.body, function(err, account) {
        if (err) {
            sendError(500, res, err, 'Failed on updateAccount');
            return next;
        }
        if (!account) {
            sendError(404, res, '', 'Account not found');
            return next;
        }
        res.status(200).json(account);
    });
};
