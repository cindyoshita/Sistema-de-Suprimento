const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const { Console } = require('console');
const Suprimentos = require ('./models/suprimentos');

mongoose.connect('mongodb+srv://SistemaSuprimentos:<password>@cluster0.a8v7sgo.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
 console.log ("Conexão OK")
}).catch(() => {
 console.log("Conexão NOK")
});


app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,OPTIONS');
  next();
});

let suprimentos = [];
let suprimentosAux = [];
let contadorSuprimento = 0;

let usuarios = [];
let contadorUsuario = 0;


app.get('/suprimentos', (req, res) => {
  
  Suprimentos.find().then(documents => {
    res.status(200).json({
    mensagem: "Tudo OK",
    suprimentos: documents
    });
    })
   

  res.status(200).send(suprimentos)
  console.log(suprimentos)
});

app.post('/suprimentos', (req, res) => {
  contadorSuprimento++;
  const {nameSupply} = req.body;
  let {qttSupply} = req.body;
  const {typeSupply} = req.body;
  let sum = 0;
 
  if (suprimentos.length == 0){
    suprimentos.push({nameSupply, qttSupply, typeSupply})
    res.status(200).send(suprimentos);
    console.log('entrei aqui')
  } else {
    for (let i=0; i<suprimentos.length; i++){
      console.log('entrei no for')
      if (nameSupply === suprimentos[i].nameSupply && typeSupply === suprimentos[i].typeSupply){
        sum = qttSupply + suprimentos[i].qttSupply;
        suprimentos[i].qttSupply = sum;
        res.status(200).send(suprimentos);
        console.log('entrei no if dentro do for')
      }
      else {
        suprimentos.push({nameSupply, qttSupply, typeSupply})
      }
    }
  }

  suprimentos.save();
  console.log (suprimentos);
  res.status(201).json({mensagem: 'Suprimento inserido'}) 

  console.log(suprimentos)
  res.status(200).send(suprimentos[contadorSuprimento]);
});




app.get('/usuario', (req, res) => {
  res.send(usuarios);
});

app.post('/usuario', (req, res) => {
  contadorUsuario++;
  const {userName} = req.body;
  const {password} = req.body;

  usuarios.push({userName, password})

  for(let i=0; i<usuarios.length; i++){
    if (userName === usuarios[i].userName && password === usuarios[i].password){
    
      res.status(401).send("Usuario ja cadastrado")
      
    }
      }
    
    console.log(usuarios)
    res.status(201).send(usuarios[contadorUsuario]);
  
});

app.post('/login', (req, res) => {
    const {userName} = req.body;
    const {password} = req.body;
    
    for(let i=0; i<usuarios.length; i++){
        if (userName === usuarios[i].userName && password === usuarios[i].password){
            res.status(200).send("Usuario logado")
        }
    }
    res.status(401).send("Falha ao logar")
})

app.listen(4000, () => {
  console.log('Porta 4000');
});

