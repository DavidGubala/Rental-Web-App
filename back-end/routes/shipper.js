const express  = require('express');
const router = express.Router();
const Shipper = require('../models/Shipper');
const Address = require('../models/Address');
const Load = require('../models/Load');
const Order = require('../models/Order');

//Get Json list of all Shippers
router.get('/', async (req, res)=>{
    try{
        const shippers = await Shipper.find();
        res.json(shippers);
    }catch(err){
        res.json({message: err});
    }
});

//Create a new Shipper
router.post('/' , async (req,res)=>{
    const shipper = new Shipper(req.body);
    try{
        const savedShipper = await shipper.save();
        res.json(savedShipper);
    }catch(err){
        res.json({message: err});
    }
});

//Read Shipper by id
router.get('/:uid', async (req, res)=>{
    try{
        const shipper = await Shipper.findById(req.params.uid);
        res.json(shipper);
    }catch(err){
        res.json({message: err});
    }
});

//Update Shipper 
router.put('/:uid', async (req, res)=>{
    try{
        const updatedShipper = await Shipper.updateOne({_id: req.params.uid}, req.body);
        res.json(updatedShipper);
    }catch(err){
        res.json({message: err});
    }
});

//Delete Shipper 
router.delete('/:uid', async (req, res)=>{
    try{
        const removedShipper = await Shipper.remove({_id: req.params.uid});
        res.json(removedShipper);
    }catch(err){
        res.json({message: err});
    }
});


//Below are similar CRUD oparations as above, but for address
//Create a new Address
router.post('/:uid/address' , async (req,res)=>{
    const address = new Address(req.body);
    try{
        const savedAddress = await address.save();
        const updatedShipper = await Shipper.updateOne({_id: req.params.uid}, {addressId: savedAddress.id});
        res.json(savedAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Read Address by id
router.get('/:uid/address', async (req, res)=>{
    try{
        const shipper = await Shipper.findById(req.params.uid);
        const shipperAddress = await Address.findById(shipper.addressId);
        res.json(shipperAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Update Address 
router.put('/:uid/address', async (req, res)=>{
    try{
        const shipper = await Shipper.findById(req.params.uid);
        console.log(shipper)
        const updatedShipperAddress = await Address.updateOne({_id: shipper.addressId}, req.body);
        res.json(updatedShipperAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Delete Shipper address
router.delete('/:uid/address', async (req, res)=>{
    try{
        const shipper = await Shipper.findById(req.params.uid);
        const removedShipperAddress = await Address.deleteOne({_id: shipper.addressId});
        const updatedShipper = await Shipper.updateOne({_id: req.params.uid}, {addressId: 'none'});
        res.json(removedShipperAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Other Options
// Get Shipper Load List
router.get('/:uid/loads', async (req, res)=>{
    try{
        const loads = await Load.find({shipperId: req.params.uid});
        res.json(loads);
    }catch(err){
        res.json({message: err});
    }
});

// Get all orders associated with the partner
router.get('/:uid/orders', async (req, res)=>{
    try{
        const orders = await Order.find({otherId: req.params.uid});
        res.json(orders);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;