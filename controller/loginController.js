const Login = require('../model/Login');
const utils = require('../utils');

class LoginController{
    
    /** Função para logar no sistema. */
    async logar( req,res ){
        let { login,senha } = req.body
        
        if( !login ){
            return res.json({
                status: 403,                
                mensage: 'Login não informado.'
            })
            
        }else{

            if( !senha ){
                return res.json({
                    status: 403,                
                    mensage: 'Senha não informado.'
                })
            }else{

                let senhaEncrypt = await utils.md5(senha);
                
                let params = { 
                    login:login,
                    senha:senhaEncrypt
                };
                try{
                    let results = await Login.autenticarLogin(params);                 
                    
                    if( results[0] ){
        
                        return res.json({
                            status: 200,
                            mensage: 'Usuário logado com sucesso.'
                        });
        
                    }else{

                        return res.json({
                            status: 401,
                            mensage: 'Usuário não cadastrado.'
                        });
        
                    }                    
                    
                }catch( err ){
                    return res.json({
                        status: 400,
                        mensage: err.sqlMessage,
                    });            
                }

            }
        }

        

    }

    /** Função para cadastro de novos login. */
    async cadastro( req,res ){
        let { login,senha,funcionario } = req.body;

        if( login ){

            let verificarLogin = await Login.verificarLogin(login);
            
            if( verificarLogin ){
                return res.json({
                    status: 400,
                    mensage: "Login já cadastrado.",
                });
            }
            
            if( senha ){              
                let senhaEncrypt = await utils.md5(senha);

                let params = {
                    login:login,
                    senha: senhaEncrypt          
                };
                
                if( funcionario ) params.funcionario = funcionario; 

                try {        
                    let results = await Login.novo(params);
                    console.log(results)
                    if( results == 0 ){
            
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
        
                } catch (err) {
        
                    if( err.errno == 1062 ){
                        
                        return res.json({
                          status: 401,
                          mensage: 'Usuário já cadastrado.',
                        });
        
                    }else{
                        return res.json({
                            status: 400,
                            mensage: err.sqlMessage,
                        });
                    }
        
                }  

            }else{
                return res.json({
                    status: 401,                
                    mensage: 'Senha não informado.'
                })
            }
        

        }else{
            return res.json({
                status: 401,                
                mensage: 'Login não informado.'
            })
        }        
        
    }

    /** Função para exclução de Login. */
    async excluir( req,res ){
        let { codigo, login } = req.body;

        if( login ){

            let loginExiste = await Login.verificarLogin(login);
            
            if( !loginExiste ){
                return res.json({
                    status: 400,
                    mensage: 'Login não cadastrado.'
                });                
            }   

            if( codigo ){
                
                let params = {
                    codigo: codigo
                };

                try{
                    
                    let results = await Login.deletar(params);
                                        
                    if( results ){
                        return res.json({
                            status: 200,
                            mensage: 'Operação realizada com sucesso.',
                        });
                    }else{                        
                        return res.json({
                            status: 400,
                            mensage: 'Entre em contato com o suporte',
                        });
                    }
    
                }catch(err){                    
                    return res.json({
                        status: 400,
                        mensage: err.sqlMessage ,
                    });    
                }
                
            }else{
                return res.json({
                    status:400,
                    mensage:'Login não informado.'
                })
            }

        }else{
            return res.json({
                status:400,
                mensage:'Login não informado.'
            })
        }

    }

    async atualizar( req,res ){
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

module.exports = new LoginController()