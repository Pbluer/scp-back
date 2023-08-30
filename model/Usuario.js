const Database = require("../dataBase/index");
const utils = require("../utils");

class User {

  /** Function responsible to create new users. */
  async register(params) {
    try {
      let results = await Database("usuario").insert(params);
      return results;
    } catch (err) {
      return {
        status: 400,
        mensage: err.sqlMessage,
      };
    }
  }

  async login(data) {
    let { login, password } = data;

    let loginExist = await this.getByLogin(login);

    if (loginExist) {
      let passwrodCrypt = await Utils.md5(password);

      try {
        let result = await Database("usuario").select("").where({
          login: login,
          password: passwrodCrypt,
        });

        let token = await Utils.tokenLogin(login);

        if (result.length > 0) {
          return {
            status: 200,
            mensage: "Login efetuado.",
            token: token,
          };
        } else {
          return {
            status: 400,
            mensage: "Senha incorreta.",
          };
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return {
        status: 403,
        mensage: "Usuário não existe ou incorreto.",
      };
    }
  }

  async getByLogin(login) {
    try {
      let result = await Database("usuario").select().where({ login: login });

      if (result.length > 0) {
        return result;
      } else {
        false;
      }
    } catch (err) {
      return {
        status: 400,
        mensage: err.sqlMessage,
      };
    }
  }

  async getByEmail(email) {
    try {
      let result = await Database("usuario").select().where({ email: email });

      if (result.length) {
        return reuslt;
      } else {
        false;
      }
    } catch (err) {
      return {
        status: 400,
        mensage: err.sqlMessage,
      };
    }
  }

  async getByName(name) {
    try {
      if (result.length > 0) {
        return result;
      } else {
        false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  /** Função para retornar os dados de usuarios. 
   * @param {object} column Coluna de dados que iram ser retornadas.
   * @param {object} where Condição imposta para retornar os dados.
   * 
   * @return {object} results
  */
  async get(column,where) {
    
    try {
      let results = await Database("usuario").select(column).where(where);
      return results;
    } catch (err) {
      console.log(err)
      return {
        status:400,
        mensage:'Entre em contato com o suporte.'
      }
    }
  }
}

module.exports = new User();
