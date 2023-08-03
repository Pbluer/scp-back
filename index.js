const express = require("express");
const bodyParse = require('body-parser');
const cors = require('cors');
var app = new express();

let user =  require('./router/user');

// evitará que ao acessar a api do mesmo lugar, tenha problemas
app.use( cors() );

// todos os dados enviado pela api será em json
app.use( bodyParse.json() );

app.use( user );

app.get('/', (req,res) => res.send('API NeeoClass 0.0.0.0' ));
app.listen( 3030, () => console.log( 'API NeeoClass' ) );