const express = require('express');
var router = express.Router();

var LoginController = require('../controller/loginController');
var UserController = require('../controller/userController');

router.post('/login', LoginController.login )
router.post('/login/cadastro', LoginController.cadastro )

router.get('/user', UserController.getAll )

module.exports = router;