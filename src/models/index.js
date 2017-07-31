'use strict';

var app = require('../app');
var companySchema = require('./company')(app.mongoose);
var userSchema = require('./user')(app.mongoose);

// find user by name
userSchema.statics.findByName = function(name, cb) {
    return this.findOne({
        name: name
    }, cb);
};

// find user by company id
userSchema.statics.findByCompanyId = function(id, cb) {
    return this.findOne({
        company: id
    }, cb);
};

var Company = app.mongoose.model('Company', companySchema);
var User = app.mongoose.model('User', userSchema);

exports.Company = Company;
exports.User = User;