let Database = require('../dataBase/index');

class Login{

    async login( req,res ){
        console.log(req)

        res.json({
            status: 200,
            mensage: 'Usuário logado com sucesso.'
        })
        
        
        /* if( !login ){
            res.json({
                status: 401,                
                mensage: 'Login não informado.'
            })
        }

        if( !senha ){
            res.json({
                status: 401,                
                mensage: 'Senha não informado.'
            })
        } */

        res.json({
            status: 200,
            mensage: 'Usuário logado com sucesso.'
        })
        
        /* try{

            let result = Database('usuario').select(['login','password']).where({
                login:login,
                password: senha
            });

            

        } */

    }

    async cadastro( req,res ){}

    async desativar( req,res ){}

    async editar( req,res ){}
}

module.exports = new Login()