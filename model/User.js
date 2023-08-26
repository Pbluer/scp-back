const Database = require('../dataBase/index');
const utils = require("../utils");

class User{

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

    async login( data ){

        let { login,password } = data;

        let loginExist = await this.getByLogin(login)

        if( loginExist ){

            let passwrodCrypt = await Utils.md5(password);
            
            try{
                let result = await Database('usuario').select('').where({
                    login: login,
                    password: passwrodCrypt
                }); 

                let token = await Utils.tokenLogin(login);

                if( result.length > 0 ){ 
                    return {
                        status: 200,
                        mensage: 'Login efetuado.',
                        token: token
                    }
                }else{
                    return {
                        status: 400,
                        mensage: 'Senha incorreta.'
                    }
                }

            }catch( err ){
                console.log(err)
            }

        }else{
            return {
                status: 403,
                mensage: 'Usuário não existe ou incorreto.'
            };
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
                        
            
            if( result.length > 0 ){
                return result
            }else{
                false;
            }

        }catch( err ){
            console.log(err)
        }
    }

    async getAll(params){
        
        try{            
            let results = await Database('usuario').select().where(params);
            
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

module.exports = new User()