const express = require('express');
var router = express.Router();

var LoginController = require('../controller/loginController');
var UserController = require('../controller/userController');
var FuncionarioController = require('../controller/funcionarioController');

router.post('/login', LoginController.acessar );
router.post('/login/cadastro', LoginController.cadastro );
router.put('/login/desativar', LoginController.desativar );
router.put('/login/editar', LoginController.editar );

router.get('/user', UserController.getAll );

router.get('/funcionario', FuncionarioController.getAll );

module.exports = router;