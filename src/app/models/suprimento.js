const mongoose = require ('mongoose');

const suprimentoSchema = mongoose.Schema ({

    nameSupply: {type: String, required: true},
    qttSupply: {type: Number, required: true},
    typeSupply: {type: String, required: true}
   });

module.exports = mongoose.model('Suprimento', suprimentoSchema);
