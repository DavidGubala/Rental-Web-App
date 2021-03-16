const express  = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Order Options
// Create order
router.post('/' , async (req,res)=>{
    const order = new Order(req.body);
    try{
        const savedOrder = await order.save();
        res.json(savedOrder);
    }catch(err){
        res.json({message: err});
    }
});

// Read order
router.get('/:oid', async (req, res)=>{
    try{
        const order = await Order.findById(req.params.oid);
        res.json(order);
    }catch(err){
        res.json({message: err});
    }
});

// Update order
router.put('/:oid', async (req, res)=>{
    try{
        const updatedOrder = await Order.updateOne({_id: req.params.oid}, req.body);
        res.json(updatedOrder);
    }catch(err){
        res.json({message: err});
    }
});

// Delete order
router.delete('/:oid', async (req, res)=>{
    try{
        const removedOrder = await Order.remove({_id: req.params.oid});
        res.json(removedOrder);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;