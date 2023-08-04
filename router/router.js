const express = require('express');
var router = express.Router();

var LoginController = require('../controller/loginController');
var UserController = require('../controller/userController');

router.get('/login', LoginController.login )

router.get('/user', UserController.getAll )

module.exports = router;