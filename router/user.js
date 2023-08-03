const express = require('express');
var router = express.Router();

var UserController = require('../controller/userController');

router.get('/user', UserController.new )

module.exports = router;