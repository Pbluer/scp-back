let Database = require('../dataBase/index');
const utils = require('../utils');

class Login{
    
    /** Função para selecionar login cadastrado*/
    async autenticarLogin( params ){
        try{
            return await Database('usuario').select().where(params);                         
        }catch( err ){
            console.log(err);        
            return {
                status:400,
                mensage:err.sqlMessage
            }
        }
    }

    /** Fuunção adicionar novos logins */
    async novo( params ){
        try {
            return await Database("usuario").insert(params);            
        } catch (err){            
            console.log(err)
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }
        
    }

    /** Função para deletar o login. */
    async deletar( params ){
        try {
            return await Database('usuario').where(params).del()
        } catch (err){            
            console.log(err)
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }
        
    }

    /** Função para verificar se o login existe */
    async verificarLogin( login ) {

        try{
            let results = await Database('usuario').select().where({ login: login })
         
            if( results.length > 0 ){
                return results
            }else{
                return false;
            }

        }catch( err ){
            return {
                status:400,
                mensage:err.sqlMessage
            }
        }
    }

    async modificar(codigo,params) {        
        try {
            return await Database('usuario').update(params).where({ codigo: codigo })
        } catch (err){            
            console.log(err)
            return {
                status: 400,
                mensage: err.sqlMessage
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
            console.log(err)
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }
    }

    async getAll(params){
        
        try{
           return await Database('usuario').select().where(params);
        }catch( err ){
            console.log(err)
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }
        
    }
}

module.exports = new Login()