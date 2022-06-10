const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const { Console } = require('console');
const Suprimento = require ('./models/suprimento');
const { db } = require('./models/suprimento');
const Usuario = require('./models/usuario');

mongoose.connect('mongodb+srv://SistemaSuprimentos:SistemaSuprimentos@cluster0.a8v7sgo.mongodb.net/?retryWrites=true&w=majority')
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
  console.log(documents)
});

app.post('/suprimentos', (req, res) => {
  const {nameSupply} = req.body;
  let {qttSupply} = req.body;
  const {typeSupply} = req.body;
  let sum = 0;
  const s = new Suprimento ({nameSupply, qttSupply, typeSupply})


  
  
  // if (Suprimento.findOne({nameSupply: s.nameSupply}).then(doc => {
  //   Suprimento.updateOne(
  //     {$inc: {qttSupply: s.qttSupply}}
  //     )
  // })
  // .catch(err => {
  //   console.error(err)
  // }));

  Suprimento.findOne({nameSupply: req.body.nameSupply, typeSupply: req.body.typeSupply }, function (err, suprimento) {
    if (err) {
      console.error(err)
    }
    
    if (suprimento) {
      console.log ("Entrei if")
      Suprimento.updateOne (
        { nameSupply: req.body.nameSupply},
        {$inc: {qttSupply: +req.body.qttSupply}}
      )
      console.log(suprimento)

    }

    else {
      s.save();
      console.log ("else")
    }
  })

  // console.log("Sai de ambos os else e do if")
  // console.log(s)
  res.status(201).json({mensagem: 'Suprimento inserido'})

});




app.get('/usuario', (req, res) => {
  res.send(usuarios);
});

app.post('/usuario', (req, res) => {
  contadorUsuario++;
  const {userName} = req.body;
  const {password} = req.body;
  const u = new Usuario({userName, password})

  Usuario.findOne({userName: req.body.userName, password: req.body.password }, function (err, usuario) {
    if (err) {
      console.error(err)
      res.status(401).send(err);
    }
    
    if (usuario) {
      console.log("Usuario ja cadastrado")
      res.status(201).json({mensagem: 'Usuario ja cadastrado'})
    }

    else {
      console.log("else usuario")
      u.save();
      res.status(201).json({mensagem: 'Usuario inserido'})
    }
  })

    

});

app.post('/login', (req, res) => {
    const {userName} = req.body;
    const {password} = req.body;

    Usuario.findOne({userName: req.body.userName, password: req.body.password }, function (err, usuario) {
      if (err) {
        console.error(err)
        res.status(401).send(err);
      }
      
      if (usuario) {
        console.log("Usuario encontrado")
        res.status(200).json({mensagem: 'Logado'})
      }
  
      else {
        console.log("else login")
        res.status(201).json({mensagem: 'Usuario não encontrado'})
      }
    })
})

app.listen(4000, () => {
  console.log('Porta 4000');
});

