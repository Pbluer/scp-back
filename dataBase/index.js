const knex = require('knex')({
    client:'mysql',
    connection:{
        host : '127.0.0.1',
        user: 'root',
        password:'root',
        database:'mystore'
    },
    log:{
        warn(msg){
            console.warn(msg)
        },
        error(msg){
            console.error(msg)
        }
    }
});

module.exports = knex;