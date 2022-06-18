const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const { Console } = require('console');
const suprimentosRoutes = require ('./rotas/suprimentos');

const { db } = require('../src/app/models/suprimento');
const Usuario = require('../src/app/models/usuario');
require('dotenv').config();



const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_DATABASE
} = process.env


//console.log(process.env)

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`)
.then(() => {
 console.log ("Conexão OK")
}).catch(() => {
 console.log("Conexão NOK")
});


app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT, DELETE,OPTIONS');
  next();
});

let suprimentosAux = [];
let contadorSuprimento = 0;

let usuarios = [];
let contadorUsuario = 0;



app.use('/suprimentos',suprimentosRoutes);



app.get('/usuario', (req, res) => {
  res.send(usuarios);
});

app.post('/usuario', (req, res) => {
  contadorUsuario++;
  const {userName} = req.body;
  const {password} = req.body;
  const u = new Usuario({userName, password})

  Usuario.findOne({userName: req.body.userName}, function (err, usuario) {
    if (err) {
      console.error(err)
      res.status(200).send(err);
    }

    if (usuario) {
      console.log("Usuario ja cadastrado")
      res.status(200).json({mensagem: 'Usuario ja cadastrado'})
    }

    else {
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
        res.status(200).send(err);
      }

      if (usuario) {
        console.log("Usuario encontrado,Logando!")
        res.status(200).json({mensagem: 'Logado',data: usuario})
      }

      else {
        res.status(200).json({mensagem: 'Usuario não encontrado'})
        console.error("Usuario e/ou senha incorretos")
      }
    })
})




app.listen(4000, () => {
  console.log('Porta 4000');
});

