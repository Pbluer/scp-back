let Database = require('../dataBase/index');

/** Classe para autenticação */
class Authenticate{

    /**
     * @param string token
     */
    __construction(token){
        console.log(token)
        this.token = token   
    }

    async usuario(codigo){
        const token = this.token;

        try{
            let results = await Database('permission').select().where({ token: token, usuario: codigo });
      
            if( results[0] ){
                let tokenResult = results[0];
    
                if( tokenResult == this.token ){
                    return true;
                }else{
                    return false;
                }  

            }
            
        }catch(err){
            console.log(err)
            return {
                status: 403,
                mensage: 'Error ao validar token'
            }   
        }
        
    }
}


module.exports = new Authenticate()