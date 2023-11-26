let Funcionario = require('../model/funcionario');
let Utils = require('../Utils/index.js');

class FuncionarioController{

    async getAll(req,res){
        let params = {};
        let results = await Funcionario.getAll(params);
        
        res.json(results);
    }

}

module.exports = new FuncionarioController()