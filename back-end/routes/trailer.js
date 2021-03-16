const express  = require('express');
const router = express.Router();
const Trailer = require('../models/Trailer');

// TRailer Options
// Create trailer
router.post('/' , async (req,res)=>{
    const trailer = new Trailer(req.body);
    try{
        const savedTrailer = await trailer.save();
        res.json(savedTrailer);
    }catch(err){
        res.json({message: err});
    }
});

// Read trailer
router.get('/:tid', async (req, res)=>{
    try{
        const trailer = await Trailer.findById(req.params.tid);
        res.json(trailer);
    }catch(err){
        res.json({message: err});
    }
});

// Update trailer
router.put('/:tid', async (req, res)=>{
    try{
        const updatedTrailer = await Trailer.updateOne({_id: req.params.tid}, req.body);
        res.json(updatedTrailer);
    }catch(err){
        res.json({message: err});
    }
});

// Delete trailer
router.delete('/:tid', async (req, res)=>{
    try{
        const removedTrailer = await Trailer.remove({_id: req.params.tid});
        res.json(removedTrailer);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;