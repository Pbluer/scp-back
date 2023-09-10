const express = require('express');
var router = express.Router();

var Authenticate = require('../middleware/authenticate')
var LoginController = require('../controller/loginController');
var FuncionarioController = require('../controller/funcionarioController');

router.use( (req,res,next) => {   
    let { token } = req.body;
    
    let permission = new Authenticate()
    
    if( typeof(permission) == 'object'){
        res.json( permission )
    }

} )

router.get('/login', LoginController.buscar );
router.post('/login', LoginController.logar );
router.post('/login/cadastro', LoginController.cadastro );
router.post('/login/excluir', LoginController.excluir );
router.put('/login/editar', LoginController.atualizar );

router.get('/funcionario', FuncionarioController.getAll );

module.exports = router;