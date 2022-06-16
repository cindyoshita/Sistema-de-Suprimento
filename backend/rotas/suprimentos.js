const express = require ("express");
const router = express.Router();
const Suprimento = require ('../../src/app/models/suprimento')




router.get('', (req, res,next) => {

  Suprimento.find().then(documents => {
    SuprimentosEncontrados = documents;
    res.status(201).json({
      mensagem: "Tudo OK",
      suprimentos: documents
      })
    console.log(documents)
  })

});

router.post('', (req, res) => {
  const {nameSupply} = req.body;
  let {qttSupply} = req.body;
  const {typeSupply} = req.body;
  let sum = 0;
  const s = new Suprimento ({nameSupply, qttSupply, typeSupply})

  Suprimento.findOne({nameSupply: req.body.nameSupply, typeSupply: req.body.typeSupply }, function (err, suprimento) {
    if (err) {
      console.error(err)
      res.status(200).json(err)
    }

    if (suprimento) {
      //console.log ("Entrei if")
      suprimento.qttSupply += req.body.qttSupply
      suprimento.save();
      res.status(200).json(suprimento)
    }

    else {
      s.save();
      //console.log ("else")
      res.status(201).json(s)
    }
  })




});


router.put ("/:id", (req, res, next) => {
  const suprimento = new Suprimento({
  _id: req.params.id,
  nameSupply: req.body.nameSupply,
  qttSupply: req.body.qttSupply,
  typeSupply: req.body.typeSupply
  });
  Suprimento.updateOne({_id: req.params.id}, suprimento)
  .then ((resultado) => {
  console.log (resultado)
  });
  res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
 });






 router.get('/:id', (req, res, next) => {
  Suprimento.findById(req.params.id).then(sup => {
  if (sup){
  res.status(200).json(sup);
  }
  else
  res.status(404).json({mensagem: "Suprimento não encontrado!"})
  })
 });





router.delete('/:id', (req, res, next) => {
  console.log("id: ", req.params.id);
  Suprimento.deleteOne({ _id: req.params.id }).then((resultado) => {
  console.log(resultado);
  res.status(200).json({ mensagem: "Suprimento removido" })
  });
 });
 router.get('/:id', (req, res, next) => {
  Suprimento.findById(req.params.id).then(cli => {
  if (cli) {
  res.status(200).json(cli);
  }
  else
  res.status(404).json({ mensagem: "Suprimento não encontrado!" })
  })
 });
 module.exports = router
