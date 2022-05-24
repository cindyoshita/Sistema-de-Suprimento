const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


let suprimentos = {};
let contadorSuprimento = 0;

let usuarios = {};
let contadorUsuario = 0;

let senha = {};
let contadorSenha = 0;


app.get('/suprimentos',(req,res) =>{
    res.send(suprimentos);
});


app.put('/suprimentos',(req,res)=>{
    contadorSuprimento++;
    const {texto} = req.body;
    suprimentos[contadorSuprimento] = {
        contadorSuprimento, texto
    }
    res.status(201).send(suprimentos[contadorSuprimento]);
});

app.get('/usuario',(req,res) =>{
    res.send(usuarios);
});

app.put('/usuario',(req,res)=>{
    contadorUsuario++;
    const {texto} = req.body;
    usuarios[contadorUsuario] = {
        contadorUsuario, texto
    }
    res.status(201).send(usuarios[contadorUsuario]);
});

app.get('/senha',(req,res) =>{
    res.send(senha);
});


app.put('/senha',(req,res)=>{
    contadorSenha++;
    const {texto} = req.body;
    senha[contadorSenha] = {
        contadorSenha, texto
    }
    res.status(201).send(senha[contadorSenha]);
});

app.get('/conta',(req,res) =>{
    res.send(senha);
    res.send(usuarios);
});


app.listen(4000,()=>{
    console.log('Porta 4000');
});