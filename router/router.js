const express = require('express');
var router = express.Router();

var LoginController = require('../controller/loginController');
var FuncionarioController = require('../controller/funcionarioController');

router.get('/login', LoginController.buscar );
router.post('/login', LoginController.logar );
router.post('/login/cadastro', LoginController.cadastro );
router.post('/login/excluir', LoginController.excluir );
router.put('/login/editar', LoginController.atualizar );

router.get('/funcionario', FuncionarioController.getAll );

module.exports = router;