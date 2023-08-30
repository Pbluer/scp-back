let database = require('../dataBase/index');
const utils = require('../utils');

class Login{
    
    /** Função para selecionar login cadastrado*/
    async selecionar( params ){

        try{
            let results = await database('usuario').select().where(params);
            return results            
        }catch( err ){
            console.log(err.sqlMessage);        
        }
    }

    /** Fuunção adicionar novos logins */
    async novo( params ){
        try {
            let results = await database("usuario").insert(params);
            return results;      
        } catch (err){            
            console.log(err.sqlMessage)
        }
        
    }

    async editar( req,res ){
        let { login,senha,email,nome } = req.body;

        if( !login ){
            return res.json({
                status: 401,                
                mensage: 'Login não informado.'
            })
        }

        if( !senha ){
            return res.json({
                status: 401,                
                mensage: 'Senha não informado.'
            })
        }
        
        if( !email ){
            return res.json({
                status: 401,                
                mensage: 'Email não informado.'
            })
        }

        if( !nome ){
            return res.json({
                status: 401,                
                mensage: 'Nome não informado.'
            })
        }

        let senhaEncrypt = await utils.md5(senha);

        try{
            
            let result = await database('usuario').where({ codigo: codigo }).update({
                login: login,
                password: senhaEncrypt,
                email: email,
                name: nome
            });

            if( result[0] ){

                return res.json({
                    status: 200,
                    mensage: "Operação realizada com sucesso.",
                });

            }else{
                return res.json({
                    status: 400,
                    mensage: "Entre em contato com o suporte.",
                });                                
            }

        }catch( err ){
            return res.json({
                status: 400,
                mensage: err.sqlMessage
            });
        }
        
    }

    async getByLogin( login ) {

        try{
            let result = await Database('usuario').select().where({ login: login })

            if( result.length > 0 ){
                return result
            }else{
                false;
            }

        }catch( err ){
            return {
                status:400,
                mensage:err.sqlMessage
            }
        }
    }

    async getByEmail( email ) {

        try{
            let result = await Database('usuario').select().where({ email: email })

            if( result.length ){
                return reuslt
            }else{
                false;
            }

        }catch( err ){
            return {
                status:400,
                mensage:err.sqlMessage
            }
        }
    }

    async getByName( name ) {

        try{
            let result = Database('usuario').select().where({ name: name })            
            
            if( result.length > 0 ){
                return result
            }else{
                false;
            }

        }catch( err ){
            console.log(err)
        }
    }

    async getAll(req,res){
        
        try{
            let result = await Database('usuario',).select(['login','email']);

            let data = result[0]
            res.json(data)
        }catch( err ){
            console.log(err)
        }
        
    }
}

module.exports = new Login()