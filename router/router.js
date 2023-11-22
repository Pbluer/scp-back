const express = require('express');
let router = express.Router();

let LoginController = require('../controller/loginController');
let FuncionarioController = require('../controller/funcionarioController');

router.get('/login', LoginController.search );
router.post('/login', LoginController.access );
router.post('/login/register', LoginController.register );
router.post('/login/excluir', LoginController.delete );
router.put('/login/editar', LoginController.update );

router.get('/funcionario', FuncionarioController.getAll );

module.exports = router;