const Auth = require('../middleware/authenticate')
const Utils = require('../Utils');
const Login = require('../model/Login');

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

                let senhaEncrypt = await Utils.md5(senha);
                
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
                let senhaEncrypt = await Utils.md5(senha);

                let params = {
                    login:login,
                    senha: senhaEncrypt          
                };
                
                if( funcionario ) params.funcionario = funcionario; 

                try {        
                    let results = await Login.novo(params);
                    
                    if( results[0]){
            
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

    /** Função para atualizar os dados existente.  */
    async atualizar( req,res ){
        let { codigo,login,senha,funcionario } = req.body;

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
        
        let senhaEncrypt = await Utils.md5(senha);

        let params = {
            login: login,
            senha: senhaEncrypt
        }

        if( funcionario ) params.funcionario = funcionario;

        try{
            
            let results = await Login.modificar(codigo,params);
            
            if( results ){

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

    /** Função para buscar os dados cadastrados. */
    async buscar(req,res){
        
        let authenticate = Auth.verifyAuthenticate();

        if( !authenticate.status ){            
            let { codigo } = authenticate;
        }

        let params = {};

        if( codigo ) params.codigo = codigo;

        try{
            let results = await Login.getAll(params);      
            
            if( results[0] ){
                return res.json(results)
            }else{
                return res.json({
                    status: 400,
                    mensage: "Nenhum login encontrado."
                })
            }

        }catch( err ){
            console.log(err)
        }
        
    }
    
}

module.exports = new LoginController()