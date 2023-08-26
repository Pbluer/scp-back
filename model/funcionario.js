const Database = require('../dataBase/index');
const utils = require("../utils");

class Funcionario{

    async new( data ){
        let { login,password,email,name,foto } = data;
     
        let loginExist = await this.getByLogin(login)
        let emailExist = await this.getByEmail(email)

        if( !emailExist ){
            
            if( !loginExist ){
                
                let passwrodCrypt = await Utils.md5(password)

                let token = await Utils.md5( Math.random() + '-' + ( new Date().getTime() )  + '-' + login );
                try{                  
                                        
                    let result = await Database('usuario').insert({
                        login: login,
                        password: passwrodCrypt,
                        email: email,
                        name: name,
                        foto: foto
                    })

                    let id = result[0];
                            
                    await Database('user_token').insert({
                        id:id,
                        token:token
                    })
                   
                    return{
                        status: 200,
                        mensage: 'Usuário cadastrado.'
                    }

                }catch( err ){

                    return {
                        status: 400,
                        mensage: err.sqlMessage
                    }
                }

            }else{
                return {
                    status:400,
                    mensage: 'Login já cadastrado.'
                }
            }

        }else{
            return {
                    status: 400,
                    mensage: 'Email já cadastrado.'
                };
        }
    }

    async getAll(params){
        
        try{            
            let results = await Database('funcionario').select().where(params);
            
            for( let value of results ){
                let dataNascimennto = value.dataNascimento;                
                value.dataNascimento = await utils.formatDateSql(dataNascimennto);                                  
            }

            return results;
        }catch( err ){
            console.log(err)
        }
        
    }
}

module.exports = new Funcionario()