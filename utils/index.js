const crypto = require('crypto');
const cryptRandom = import('crypto-random-string')
const fs = require('fs')

class Utils{
    
    /**
     * Function to get the current date time
     * @param {Boolean} Object Return a object or string
     * @return {String|Object} 
     */
    async getDateTimeSql(object = false) {

        let date = new Date()

        let day = date.getDate() > 9 ? date.getDate() : `0` + date.getDate();
        let monthAux = date.getMonth() + 1;
        let month = monthAux > 9 ? monthAux : `0` + monthAux;
        let year = date.getFullYear();

        let hour =  date.getHours() > 9 ? date.getHours() : `0` + date.getHours();
        let min =  date.getMinutes() > 9 ? date.getMinutes() : `0` + date.getMinutes();
        let sec =  date.getSeconds() > 9 ? date.getSeconds() : `0` + date.getSeconds();

        return object ? date : `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }

    /**
     * Function to get the current date
     * @param {Boolean} object Return a object or string
     * @return {String|Object} 
     */
    async getDateSql(object) {

        let date = new Date()

        let day = date.getDate() > 9 ? date.getDate() : `0` + date.getDate();
        let monthAux = date.getMonth() + 1;
        let month = monthAux > 9 ? monthAux : `0` + monthAux;
        let year = date.getFullYear();

        return object ? date: `${year}-${month}-${day} 00:00:00`;
    }

    /**
     * Function to format object datime time into dd/mm/yyyy
     * @param {Object} Object
     * @return {String}
     *  */
    async formatDateSql( value ){
        if( !value ) return ''

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

    async imageBase64( path,type ){
        let bitmapString = (fs.readFileSync(path)).toString('base64');
        this.deleteUpload(path);
        return `data:${type};base64,` + bitmapString;
    }

    createToken(){
        return cryptRandom({ length: 200 })
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