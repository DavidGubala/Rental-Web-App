const express  = require('express');
const router = express.Router();
const Truck = require('../models/Truck');

// Truck Options
// Create truck
router.post('/' , async (req,res)=>{
    const truck = new Truck(req.body);
    try{
        const savedTruck = await truck.save();
        //console.log(savedTruck)
        res.json(savedTruck);
    }catch(err){
        res.json({message: 'failed to save rental'});
    }
});

// Update truck
router.put('/:tid', async (req, res)=>{
    try{
        const updatedTruck = await Truck.updateOne({_id: req.params.tid}, req.body);
        res.json(updatedTruck);
    }catch(err){
        res.json({message: err});
    }
});

// Delete truck
router.delete('/:tid', async (req, res)=>{
    try{
        const removedTruck = await Truck.remove({_id: req.params.tid});
        res.json(removedTruck);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;