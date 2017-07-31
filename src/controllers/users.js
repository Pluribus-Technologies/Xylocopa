var ObjectId = require('mongodb').ObjectId;
var models = require('../models');

exports.getUsers = function (req, res, next) {
  models.User.find({}, function(err, users) {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
}

exports.getUser = function (req, res, next) {
  models.User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
  });
}

exports.addUser = function (req, res, next) {
  var user = new models.User();
  user.name = req.body.name;

  user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'User created' });
  });
}

exports.updateUser = function (req, res, next) {
  models.User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.send(err);
    }
    user.name = req.body.name;

    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'User updated' });
    });

  });
}

exports.deleteUser = function (req, res, next) {
  models.User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
}