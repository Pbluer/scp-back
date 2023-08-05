let database = require('../dataBase/index');
const utils = require('../utils');

class Login{
    
    async login( req,res ){
        let { login,password } = req.body
        
        if( !login ){
            res.json({
                status: 401,                
                mensage: 'Login não informado.'
            })
        }

        if( !password ){
            res.json({
                status: 401,                
                mensage: 'Senha não informado.'
            })
        }
        
        /* try{

            let result = Database('usuario').select().where({
                login:login,
                password: senha
            }).count('login');

            
        } */
        
        res.json({
            status: 200,
            mensage: 'Usuário logado com sucesso.'
        })
    }

    async cadastro( req,res ){
        let { login,password } = req.body;

        if( !login ){
            res.json({
                status: 401,                
                mensage: 'Login não informado.'
            })
        }

        if( !password ){
            res.json({
                status: 401,                
                mensage: 'Senha não informado.'
            })
        }
        
        let loginExiste = this.verificarLogin(login);

        if( !loginExiste ){

            let passwordEncrypt = await utils.md5(password);
    
            try{
    
                let result = await database('usuario').insert({
                    login: login,
                    password: passwordEncrypt
                })
    
                let id = result[0];
    
                console.log(id)
    
                res.json({
                    status:200,
                    mensage: 'Operação realizada com sucesso.'
                })
    
            }catch( err ){            
                res.json({
                    status: 401,
                    mensage: err.sqlMessage
                })
            }

        }else{
            res.json({
                status: 400,
                mensage: 'Usuário já cadastrado'
            })
        }

    }

    async verificarLogin( login ) {
        
        try{
            let result = await database('usuario').select().where({ login: login })

            if( result.length > 0 ){
                return true
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

    async desativar( req,res ){}

    async editar( req,res ){}
}

module.exports = new Login()