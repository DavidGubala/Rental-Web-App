const express  = require('express');
const router = express.Router();
const Trailer = require('../models/Trailer');
/* 
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage : storage }).array('pics',10);
 */
// Trailer Options
// Create trailer
router.post('/' , async (req,res)=>{
    const trailer = new Trailer(req.body);
    try{
        const savedTrailer = await trailer.save();
        /* upload(req,res,function(err) {
            if(err) {
                return res.end("Error uploading file.");
            }
        }); */
        res.json(savedTrailer);
    }catch(err){
        res.json({message: 'failed to save rental'});
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