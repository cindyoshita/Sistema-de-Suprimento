const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,OPTIONS');
  next();
});

let suprimentos = {};
let contadorSuprimento = 0;

let usuarios = [];
let contadorUsuario = 0;

let senha = {};
let contadorSenha = 0;
let logged;


app.get('/suprimentos', (req, res) => {
  res.send(suprimentos);
});


app.post('/suprimentos', (req, res) => {
  contadorSuprimento++;
  const { texto} = req.body;
  suprimentos[contadorSuprimento] = {
    contadorSuprimento,
    texto
  }
  res.status(201).send(suprimentos[contadorSuprimento]);
});

app.get('/usuario', (req, res) => {
  res.send(usuarios);
});

app.post('/usuario', (req, res) => {
  contadorUsuario++;
  const {username} = req.body;
  const {password} = req.body;
  usuarios.push({username,
    password})
  console.log(usuarios)
  res.status(201).send(usuarios[contadorUsuario]);
});

app.post('/login', (req, res) => {
    const {username} = req.body;
    const {password} = req.body;
    
    for(let i=0; i<usuarios.length; i++){
        if (username === usuarios[i].username && password === usuarios[i].password){
            res.status(200).send("Usuario logado")
        }
    }
    res.status(401).send("Falha ao logar")

})

app.listen(4000, () => {
  console.log('Porta 4000');
});

