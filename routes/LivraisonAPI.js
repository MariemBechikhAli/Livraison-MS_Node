const { Livraison } = require("../models/Livraison")
const express = require('express');
const router = express.Router();

// List Livraisons
router.get('/livraison-list', async (req, res) => {
    const livraisons = await Livraison.find();
    res.json(livraisons);
});
// Post Livraison
router.post('/addLivraison', async (req, res) => {
    try{
    const newLivraison = new Livraison({
        Date_Liv: new Date(),
        nombre_colis: req.body.nombre_colis,
        address: req.body.address,
      });
    const livraison = await newLivraison.save();
    res.json(livraison);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Livraison
router.put('/update-livraison/:id', async(req,res)=>{
    const updateLivraison = await Livraison.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.json(updateLivraison);    
});

// Annuler Livraison
router.delete('/delete-livraison/:id', async(req,res)=>{
    const deleteLivraison = await Livraison.findByIdAndDelete(req.params.id);
    res.json({message: 'Canceled delivery !  '});
})




module.exports = router;