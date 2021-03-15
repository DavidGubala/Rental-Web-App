const express  = require('express');
const router = express.Router();
const Truck = require('../models/Truck.js');
const Trailer = require('../models/Trailer.js');
const Partner =  require('../models/Partner.js');

// Rental Options
// Get Site Inventory Rentals

//Get Json list of all Partners
router.get('/inventory', async (req, res)=>{
    try{
        const trucks = await Truck.find();
        const trailers = await Trailer.find();
        const inv = trucks + trailers;
        res.json(inv);
    }catch(err){
        res.json({message: err});
    }
});

// Get Partner Inventory Rentals
router.get('/inventory/:uid', async (req, res)=>{
    try{
        const partner = await Partner.findById(req.params.uid);
        const trucks = await Truck.find({ownerId: partner.id});
        const trailers = await Trailer.find({ownerId: partner.id});
        const inv = trucks + trailers;
        res.json(inv);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;