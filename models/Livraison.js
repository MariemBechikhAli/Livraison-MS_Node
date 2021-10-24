const mongoose = require('mongoose');

const LivraisonSchema = new mongoose.Schema({
    Date_Liv:{type: Date},
    nombre_colis: { type: Number},
    address :{type: String}
});

const Livraison= mongoose.model('Livraison', LivraisonSchema,'Livraison');

module.exports={LivraisonSchema,Livraison}
