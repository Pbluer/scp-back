const Auth = require('../middleware/authenticate')
const Utils = require('../Utils');
const Login = require('../model/Login');

class LoginController{
    
    /** Function to login in the system */
    async access( req,res ){
        let { login,password } = req.body
        
        if( !login ){
            return res.json({
                status: 403,                
                mensage: 'Login não informado.'
            })
            
        }else{

            if( !password ){
                return res.json({
                    status: 403,                
                    mensage: 'Senha não informada.'
                })
            }else{

                let passwordEncrypt = await Utils.md5(password);                

                let params = { 
                    login:login,
                    password:passwordEncrypt
                };

                try{

                    let results = await Login.autenticarLogin(params);                 

                    if( results[0] ){               
                        let result = results[0];

                        let jwt = await Auth.createToken({
                            codigo: result.codigo,
                            category: result.category,
                        })
                       
                        return res.json({
                            status: 200,
                            mensage: 'Usuário logado com sucesso.',
                            jwt: jwt
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

    /** Function to create new user login */
    async register( req,res ){
        let { category,identification,name,login,password } = req.body;
   
        if( login ){

            let loginVerify = await Login.verify(login);
           
            if( loginVerify ){
                return res.json({
                    status: 400,
                    mensage: "Login já cadastrado.",
                });
            }
            
            if( password ){              
                //let loginToken = await Utils.createToken();
                let passwordEncrypt = await Utils.md5(password);
                let datetime = await Utils.getDateTimeSql()
                let token = await Utils.md5( datetime + login );
                                
                let params = {
                    category: category,
                    password: passwordEncrypt,
                    id: identification,
                    login: login,
                    name: name,
                    token: token        
                };               
               
                try {        
                    let results = await Login.newLogin(params);

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

    /** Function to delete user login */
    async delete( req,res ){
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

    /** Function to update user login data  */
    async update( req,res ){
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

    /** Function to search data of a user login */
    async search(req,res){
        
        let authenticate = Auth.verifyAuthenticate();

        if( authenticate.status !== 200){
            return res.json( authenticate )
        }
        
        let { codigo } = req.body;

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