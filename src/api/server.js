const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var mongoUrl = 'mongodb://localhost/test';
var db

MongoClient.connect(mongoUrl, (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(4000, () => {
        console.log('listening on 4000')
    })
})

// get all accounts
app.get('/api/account', function(req, res) {
    console.log("get all accounts");
    var collection = db.collection('account');
    collection.find().toArray(function(err, results) {
        if (err) {
            res.status(400).send("udapte error:" + JSON.stringify(err));
        }
        res.status(200).send(results);
    });
});

// get account by id
app.get('/api/account/:id', function(req, res) {
    console.log("find by: " + req.params.id);
    if (req.params.id.length != 12 && req.params.id.length != 24) {
        res.status(404).send("account not found:");
    } else {
        var collection = db.collection('account');

        collection.findOne({ "_id": new ObjectId(req.params.id) }, function(err, results) {
            if (err) {
                res.status(404).send("account not found:" + JSON.stringify(err));
            } else if (results == null) {
                res.status(404).send("account not found:");
            } else {
                res.status(200).send(results);
            }
        });
    }
});

// remove account by id
app.delete('/api/account/:id', function(req, res) {
    console.log("remove by: " + req.params.id);
    var collection = db.collection('account');
    collection.remove({ "_id": new ObjectId(req.params.id) }, function(err, results) {
        if (err) {
            res.status(404).send("account not found:" + JSON.stringify(err));
        } else if (results.length == 0) {
            res.status(404).send("account not found:");
        } else {
            res.status(200).send(req.params.id + " was removed successfully");
        }
    });
});

// insert/update account
app.post('/api/account', function(req, res) {
    console.log("Insert or update");
    var collection = db.collection('account');
    if (req.body._id === undefined) {
        //insert new record
        collection.insert(req.body, function(err, items) {
            res.status(200).send("account added");
        });
    } else {
        // update record based on the field req.body._id
        console.log("\nreq: " + JSON.stringify(req.body));
        collection.findOne({ "_id": new ObjectId(req.body._id) }, function(err, results) {
            console.log("\nbody: " + JSON.stringify(results));
            var contact = new Contact(req.body.contact.firstName,
                req.body.contact.lastName, req.body.contact.phone, req.body.contact.email);
            var location = new Location(req.body.location.address1, req.body.location.address2, req.body.location.city, req.body.location.state, req.body.location.postalCode, req.body.location.country);
            var account = new Account(req.body.organization, location, contact, req.body.webURL)
            collection.update({ "_id": new ObjectId(req.body._id) }, { $set: { 'account': account } }, function(err, result) {
                if (err) {
                    res.status(400).send("udapte error:" + JSON.stringify(err));
                }
                res.status(200).send(result);
            });
        });
    }
});

function Account(organization, location, contact, webURL) {
    this.organization = organization;
    this.location = location;
    this.contact = contact;
    this.webURL = webURL;
}

function Location(address1, address2, city, state, postalCode, country) {
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
}

function Contact(firstName, lastName, phone, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
}