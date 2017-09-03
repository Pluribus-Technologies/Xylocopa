'use strict';

var app = require('../../server.js');
var accountSchema = require('./account')(app.mongoose);
var Account = app.mongoose.model('Account', accountSchema);

// get account type
function getAccountType() {
    return Account;
}
// get all accounts
function getAllAccounts(cb) {
    return Account.find({}, cb);
}
// get account by id
function getAccountById(accountId, cb) {
    return Account.findById(accountId, cb);
}
// remove account by id
function removeAccountById(accountId, cb) {
    return Account.findByIdAndRemove(accountId, cb);
}
// update account
function updateAccount(accountId, account, cb) {
    return Account.findByIdAndUpdate(accountId, account, cb);
}
// create account
function createAccount(account, cb) {
    return Account.create(account, cb);
}

// revealing pattern
module.exports = (function() {
    return {
        getAllAccounts: getAllAccounts,
        getAccountById: getAccountById,
        removeAccountById: removeAccountById,
        updateAccount: updateAccount,
        createAccount: createAccount,
        getAccountType: getAccountType
    }
})();
