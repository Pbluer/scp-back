let Database = require('../dataBase/index');
let jwt = require('jsonwebtoken');
const secretKeySystem = '202cb962ac59075b964b07152d234b70';

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
    async createToken(payload){
        
        let options = {
            algorithm: 'HS256',
            expiresIn: '1h',
            //iss: emissor
        };

        let results = jwt.sign( payload,secretKey,options );
        
        return results;
    }
    
    /**
     * Function to authenticate the json web token
     * @param {String} token
     * @return {object}
     * */
    async verifyAuthenticate(token){
        let secretKey = token ?? secretKeySystem;

        let results = jwt.verify(teste,secretKey, (err,decoded) => {
            
            if( err ){
                console.log(err)
                return {
                    status: 400,
                    mensage: err.name
                }
            }else{
                return decoded
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