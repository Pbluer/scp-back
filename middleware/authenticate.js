let Database = require('../dataBase/index');
let jwt = require('jsonwebtoken');
const _secretKeySystem = '202cb962ac59075b964b07152d234b70';

/**
 * Class to authenticate access
*/
class Authenticate{ 
    
    /**
     * Function to create authenticate to new user
     * 
     * @param {Object} payload 
     * @return {String}
     * */
    async createToken(payload, expire = false){
        
        let options = {
            algorithm: 'HS256',            
            //iss: emissor
        };

        if(expire) options.expiresIn = '1h'

        let results = jwt.sign( payload,_secretKeySystem,options );
        
        return results;
    }
    
    /**
     * Function to authenticate the json web token
     * @param {String} token
     * @return {object}
     * */
    async verifyAuthenticate(token){      

        let results = jwt.verify(token,_secretKeySystem, (err,decoded) => {
            
            if( err ){               
                return {
                    status: 400,
                    mensage: err.name
                }
            }else{
                
                let userToken = this.getTokenUser( decoded.codigo );

                if( userToken == decoded.token ){
                    return {
                        status: 200,
                        mensage: "Usuário verificado."
                    }
                }else{
                    return {
                        status: 403,
                        mensage: "Usuário não validado."
                    }
                }
                
            }

        });

        return results          
    }   

    /**
     * Get the user token from the databases
     * 
     * @param {Number} codigo
     * 
     * @return {String}
     */
    async getTokenUser(codigo){
        try{
            return await Database("userToken").select().where({codigo: codigo})
        }catch(err){
            return {
                status:400,
                mensage
            }
        }
    }
}   

module.exports = new Authenticate()