const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


let suprimentos = {};
let contador = 0;


app.get('/suprimentos',(req,res) =>{
    res.send(suprimentos);
});


app.put('/suprimentos',(req,res)=>{
    contador++;
    const {texto} = req.body;
    suprimentos[contador] = {
        contador, texto
    }
    res.status(201).send(suprimentos[contador]);
});


app.listen(4000,()=>{
    console.log('Suprimentos.Porta 4000');
});