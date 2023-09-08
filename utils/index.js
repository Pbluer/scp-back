const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const fs = require('fs')
class Utils{

    async getDateTimeSql() {

        let date = new Date()

        let day = date.getDate() > 9 ? date.getDate() : `0` + date.getDate();
        let monthAux = date.getMonth() + 1;
        let month = monthAux > 9 ? monthAux : `0` + monthAux;
        let year = date.getFullYear();

        let hour =  date.getHours() > 9 ? date.getHours() : `0` + date.getHours();
        let min =  date.getMinutes() > 9 ? date.getMinutes() : `0` + date.getMinutes();
        let sec =  date.getSeconds() > 9 ? date.getSeconds() : `0` + date.getSeconds();

        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }

    async getDateSql() {

        let date = new Date()

        let day = date.getDate() > 9 ? date.getDate() : `0` + date.getDate();
        let monthAux = date.getMonth() + 1;
        let month = monthAux > 9 ? monthAux : `0` + monthAux;
        let year = date.getFullYear();

        return ` ${year}-${month}-${day} 00:00:00`;
    }

    async formatDateSql( value ){
        if( !value ){
            return ''
        }
        let data = new Date(value)

        let dia = data.getDate() > 9 ? data.getDate() : `0` + data.getDate();
        let mesAux = data.getMonth() + 1;
        let mes = mesAux > 9 ? mesAux : `0` + mesAux;
        let ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`
    }
    
    async md5( value ) {
        return crypto.createHash('md5')
            .update(value)
            .digest('hex');
    }

    async tokenLogin( data ){
        // gera um usando o login token que irá expirar em uma hora
        // var decoded = jwt.verify(webTokenEncript, 'imagineUmaChaveSecreta');
        
        return jwt.sign({ data: data }, 'imagineUmaChaveSecreta', { expiresIn: '1h' });
    }
    
    async imageBase64( path,type ){
        let bitmapString = (fs.readFileSync(path)).toString('base64');
        this.deleteUpload(path);
        return `data:${type};base64,` + bitmapString;
    }

    async deleteUpload( path ){

        fs.unlink(path, err => {
            if( err ) throw err;
        })
        
        return;
    }   
    
    /** Função para formatar queryURL para array.
     * 
     * @param {object} value Parâmetro para formatar.
     * 
     * @return {Array} column
     */
    async formataQueryUrl(value){
        if( !value ) return false;

        let splits = value.split('&');
        let column = [];
        
        for( let split of splits ){
            column.push(split)
        }

        return column
    }
}

module.exports = new Utils();