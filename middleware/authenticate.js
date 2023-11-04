let Database = require('../dataBase/index');
let jwt = require('jsonwebtoken');
const secretKey = '202cb962ac59075b964b07152d234b70';

/**
 * Class to authenticate access
*/
class Authenticate{ 
    
    /**
     * Function to create authenticate to new user
     * 
     * @param {Object} payload 
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
    
    async verifyAuthenticate(){
        let teste = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RpZ28iOjEsImlhdCI6MTY5OTEzNTUyOSwiZXhwIjoxNjk5MTM5MTI5fQ.LJZIoWPm8FQiXQyPgyNtW527wrYgcVkVTt_C2Ec_V7k';

        let results = jwt.verify(teste,secretKey, (err,decoded) => {
            
            if( !err ){
                return decoded
            }
        });
       
    }   
}

module.exports = new Authenticate()