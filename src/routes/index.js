const express = require('express');
const router = express.Router();
var userController;

router.connect = function() {
    userController = require('../controllers/users.js');

    router.get('/', function(req, res) {
      res.json({ message: 'welcome to the api' });
    });

    router.get("/users", userController.getUsers);
    router.get("/users/:user_id", userController.getUser);
    router.post("/users/new", userController.addUser);
    router.put("/users/:user_id", userController.updateUser);
    router.delete("/users/:user_id", userController.deleteUser);

};

module.exports = router;