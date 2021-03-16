const express  = require('express');
const router = express.Router();
const Load = require('../models/Load');

// Load Options
// Create load
router.post('/' , async (req,res)=>{
    const load = new Load(req.body);
    try{
        const savedLoad = await load.save();
        res.json(savedLoad);
    }catch(err){
        res.json({message: err});
    }
});

// Read load
router.get('/:lid', async (req, res)=>{
    try{
        const load = await Load.findById(req.params.lid);
        res.json(load);
    }catch(err){
        res.json({message: err});
    }
});

// Update load
router.put('/:lid', async (req, res)=>{
    try{
        const updatedLoad = await Load.updateOne({_id: req.params.lid}, req.body);
        res.json(updatedLoad);
    }catch(err){
        res.json({message: err});
    }
});

// Delete load
router.delete('/:lid', async (req, res)=>{
    try{
        const removedLoad = await Load.remove({_id: req.params.lid});
        res.json(removedLoad);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;