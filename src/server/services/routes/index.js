'use strict';
const express = require('express');
const router = express.Router();
var accountController;

router.connect = function() {
    accountController = require('../controllers/accountController.js');

    router.get('/', function(req, res) {
        res.json({ message: 'Welcome to the api' });
    });

    router.get('/account', accountController.getAllAccounts);
    router.get('/account/:id', accountController.getAccountById);
    router.post('/account', accountController.createAccount);
    router.put('/account/:id', accountController.updateAccount);
    router.delete('/account/:id', accountController.removeAccountById);
};

module.exports = router;
