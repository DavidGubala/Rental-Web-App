const express  = require('express');
const router = express.Router();
const Truck = require('../models/Truck');
const Trailer = require('../models/Trailer');

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

module.exports = router;