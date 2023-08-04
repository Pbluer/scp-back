const express = require("express");
const bodyParse = require('body-parser');
const cors = require('cors');
var app = new express();

let Router =  require('./router/router');

// evitará que ao acessar a api do mesmo lugar, tenha problemas
app.use( cors() );
app.use( bodyParse.urlencoded( { extended: false }) )
// todos os dados enviado pela api será em json
app.use( bodyParse.json() );

app.use( Router );

app.get('/', (req,res) => res.send('API NeeoClass 0.0.0.0' ));
app.listen( 3030, () => console.log( 'API NeeoClass' ) );