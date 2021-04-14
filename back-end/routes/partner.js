const express  = require('express');
const router = express.Router();
const Partner = require('../models/Partner');
const Address = require('../models/Address');
const Truck = require('../models/Truck');
const Trailer = require('../models/Trailer');
const Order = require('../models/Order');

//Get Json list of all Partners
router.get('/', async (req, res)=>{
    try{
        const partners = await Partner.find();
        res.json(partners);
    }catch(err){
        res.json({message: err});
    }
});

//Create a new Partner
router.post('/' , async (req,res)=>{
    const partner = new Partner(req.body);
    try{
        const savedPartner = await partner.save();
        res.json(savedPartner);
    }catch(err){
        res.json({message: err});
    }
});

//Read Partner by id
router.get('/:uid', async (req, res)=>{
    try{
        const partner = await Partner.findById(req.params.uid);
        res.json({status: 'exist', partner});
    }catch(err){
        res.json({status: 'notexist'});
    }
});

//Update Partner 
router.put('/:uid', async (req, res)=>{
    try{
        const updatedPartner = await Partner.updateOne({_id: req.params.uid}, req.body);
        res.json(updatedPartner);
    }catch(err){
        res.json({message: err});
    }
});

//Delete Partner 
router.delete('/:uid', async (req, res)=>{
    try{
        const removedPartner = await Partner.remove({_id: req.params.uid});
        res.json(removedPartner);
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
        const updatedPartner = await Partner.updateOne({_id: req.params.uid}, {addressId: savedAddress.id});
        res.json(savedAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Read Address by id
router.get('/:uid/address', async (req, res)=>{
    try{
        const partner = await Partner.findById(req.params.uid);
        const partnerAddress = await Address.findById(partner.addressId);
        res.json(partnerAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Update Address 
router.put('/:uid/address', async (req, res)=>{
    try{
        const partner = await Partner.findById(req.params.uid);
        const updatedPartnerAddress = await Address.updateOne({_id: partner.addressId}, req.body);
        res.json(updatedPartnerAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Delete Partner address
router.delete('/:uid/address', async (req, res)=>{
    try{
        const partner = await Partner.findById(req.params.uid);
        const removedPartnerAddress = await Address.deleteOne({_id: partner.addressId});
        const updatedPartner = await Partner.updateOne({_id: req.params.uid}, {addressId: 'none'});
        res.json(removedPartnerAddress);
    }catch(err){
        res.json({message: err});
    }
});

// Other Options (get inventory, get orders)
// Get Partner Inventory Rentals
router.get('/:uid/inventory', async (req, res)=>{
    try{
        const trucks = await Truck.find({ownerId: req.params.uid});
        const trailers = await Trailer.find({ownerId: req.params.uid});
        const inv = trucks + trailers;
        res.json(inv);
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