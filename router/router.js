const express = require('express');
var router = express.Router();

var LoginController = require('../controller/loginController');
var UsuarioController = require('../controller/UsuarioController');
var FuncionarioController = require('../controller/funcionarioController');

router.post('/login', LoginController.logar );
router.post('/login/cadastro', LoginController.cadastro );
router.put('/login/desativar', LoginController.desativar );
router.put('/login/editar', LoginController.editar );

router.post('/usuario/cadastro', UsuarioController.new );
router.get('/usuario/busca', UsuarioController.getAll );

router.get('/funcionario', FuncionarioController.getAll );

module.exports = router;