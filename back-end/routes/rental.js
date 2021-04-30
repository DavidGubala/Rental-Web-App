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
        const inv = {
            trucks, 
            trailers
        };
        res.json(inv);
    }catch(err){
        res.json({message: 'noVehicles'});
    }
});

// Read Rental
router.get('/:tid', async (req, res)=>{
    try{
        const trailer = await Trailer.findById(req.params.tid);
        const truck = await Truck.findById(req.params.tid);
        if(trailer){
            res.json({
                message:'trailer',
                rental: trailer
            });
        }else if(truck){
            res.json({
                message:'truck',
                rental: truck
            });
        }else{
            res.json({message: 'notexist'});
        }
    }catch(err){
        res.json({message: 'notexist'});
    }
});

module.exports = router;