/*jshint esversion: 6 */

const repository = require('../src/server/db/schema');
//TODO need to remove this dependency
var app = require('../src/server/server.js');
const assert = require('assert');

//ES6 Promise
app.mongoose.Promise = global.Promise;

//Drop the collection before each test
beforeEach(function(done) {
    //Drop the collection
    app.mongoose.connection.collections.accounts.drop(function() {
        done();
    });
});

describe('Create an Account', () => {
    it('Create account and save it to the database', (done) => {
        //get account schema
        var Account = repository.getAccountType();

        // create new account
        var newAccount = new Account({
            organization: 'Maria Organization'
        });

        //save account
        repository.createAccount(newAccount, function(err, accountCreated) {
            assert(err === null);
            assert(accountCreated._id != null);
            done();
        });
    });
});

describe('Get account by id', () => {
    var id;
    //Before this test we need to make sure at least 1 account is saved in the database
    beforeEach((done) => {
        //get account schema
        var Account = repository.getAccountType();

        // create new account
        var newAccount = new Account({
            organization: 'Maria Test'
        });
        //save account
        repository.createAccount(newAccount, function(err, accountCreated) {
            id = accountCreated._id;
            done();
        });
    });

    //
    it('Get an account from the database by id', (done) => {
        repository.getAccountById(id, function(err, myAccount) {
            assert(err === null);
            assert(myAccount.organization === 'Maria Test');
            done();
        });
    });
});

// get all accounts
describe('Get all accounts', function() {
    // Before this test we need to make sure at least 1 account is saved in the database
    beforeEach((done) => {
        // get account schema
        var Account = repository.getAccountType();

        // create new account
        var newAccount = new Account({
            organization: 'Maria Test'
        });
        //save account
        repository.createAccount(newAccount, function(err, accountCreated) {
            done();
        });
    });
    it('Find all accounts', function(done) {
        repository.getAllAccounts(function(err, allAccounts) {
            assert(err === null);
            assert(allAccounts.length > 0);
            done();
        });
    });
});

// remove account by id
describe('Remove account by id', function() {
    var accountId;
    // Before this test we need to make sure at least 1 account is saved in the database
    beforeEach((done) => {
        // get account schema
        var Account = repository.getAccountType();

        // create new account
        var newAccount = new Account({
            organization: 'Maria Test'
        });
        //save account
        repository.createAccount(newAccount, function(err, accountCreated) {
            accountId = accountCreated._id;
            done();
        });
    });
    it('Remove account by id', function(done) {
        repository.removeAccountById(accountId, function(err, result) {
            assert(err === null);
            assert(result != null);
            repository.getAccountById(accountId, function(err, myAccount) {
                assert(err === null);
                assert(myAccount === null);
                done();
            });
        });
    });
});

// update account
describe('Update account by id', function() {
    var accountId;
    var account;
    // Before this test we need to make sure at least 1 account is saved in the database
    beforeEach((done) => {
        // get account schema
        var Account = repository.getAccountType();

        // create new account
        var newAccount = new Account({
            organization: 'Maria Test'
        });
        //save account
        repository.createAccount(newAccount, function(err, accountCreated) {
            accountId = accountCreated._id;
            account = accountCreated;
            done();
        });
    });
    it('Update account by id', function(done) {
        account.organization = 'Maria Update';
        repository.updateAccount(accountId, account, function(err, result) {
            assert(err === null);
            assert(result != null);

            repository.getAccountById(accountId, function(err, accountUpdated) {
                assert(err === null);
                assert(accountUpdated.organization === 'Maria Update');
                done();
            });
        });
    });
});
