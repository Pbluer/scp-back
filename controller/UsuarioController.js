let Usuario = require('../model/Usuario');
const utils = require('../utils/index');
let Utils =  require('../utils/index');

class UsuarioController{

    /** Função responsável de tratar os dados para a função de cadastro */
    async new( req,res ){
        let { login,senha,funcionario } = req.body;

        if( login ){
            let loginExist = await Usuario.getByLogin(login);

            if( senha ){
    
                if (!loginExist) {
                    let senhaEncriptada = await Utils.md5(senha);
        
                    // let token = await Utils.md5( Math.random() + '-' + ( new Date().getTime() )  + '-' + login );

                    try {
    
                        let params = {
                            login: login,
                            senha: senhaEncriptada,
                            funcionario:funcionario
                        };
        
                        let results = await Usuario.cadastro(params);
                        
                        if( results[0] ){
                            res.json({
                                status: 200,
                                mensage: "Usuário cadastrado.",
                            });
                        }else{
                            res.json({
                                status: 400,
                                mensage: "Usuário não cadastrado.",
                            });
                        }
    
                    } catch (err) {
                        res.json({
                            status: 400,
                            mensage: err.sqlMessage,
                        });
                    }
                } else {
                    res.json({
                        status: 400,
                        mensage: "Login já cadastrado.",
                    });
                }
    
            }else{
                res.json({
                    status: 403,
                    mensage: "Senha não informada.",
                });
            }
        }else{
            res.json({
                status: 403,
                mensage: "Login não informado.",
            });
        }

        
    }

    /** Função responsável por recuperar todos os usuários. */
    async getAll(req,res){
        let column = await  utils.formataQueryUrl(req._parsedUrl.query);
        let where = req.body;       

        if( !column ){
            res.json({
                status:401,
                mensage:'Informações não passadas.'
            })
        }
           
        let results = await Usuario.get(column,where);        
        res.json(results);
    }

}

module.exports = new UsuarioController()