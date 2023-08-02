const express = require("express");
const bodyParse = require('body-parser');
const cors = require('cors');

var app = new express();


// evitará que ao acessar a api do mesmo lugar, tenha problemas
app.use( cors() );

// todos os dados enviado pela api será em json
app.use( bodyParse.json() );

app.get('/', (req,res) => {
    res('/')
});

app.listen( 3030, () => console.log( 'API NeeoClass' ) );