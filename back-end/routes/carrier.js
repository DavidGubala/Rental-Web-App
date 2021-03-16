const express  = require('express');
const router = express.Router();
const Carrier = require('../models/Carrier');
const License = require('../models/License');
const Address = require('../models/Address');
const Order = require('../models/Order');
const bodyParser = require("body-parser");
router.use(bodyParser.json());

//Get Json list of all Carriers
router.get('/', async (req, res)=>{
    try{
        const carriers = await Carrier.find();
        res.json(carriers);
    }catch(err){
        res.json({message: err});
    }
});

//Create a new Carrier
router.post('/' , async (req,res)=>{
    const carrier = new Carrier(req.body);
    try{
        const savedCarrier = await carrier.save();
        res.json({carrier: savedCarrier});
    }catch(err){
        res.json({message: err});
    }
});

//Read Carrier by id
router.get('/:uid', async (req, res)=>{
    try{
        const carrier = await Carrier.findById(req.params.uid);
        res.json(carrier);
    }catch(err){
        res.json({message: err});
    }
});

//Update Carrier 
router.put('/:uid', async (req, res)=>{
    try{
        const updatedCarrier = await Carrier.updateOne({_id: req.params.uid}, req.body);
        res.json(updatedCarrier);
    }catch(err){
        res.json({message: err});
    }
});

//Delete Carrier 
router.delete('/:uid', async (req, res)=>{
    try{
        const removedCarrier = await Carrier.deleteOne({_id: req.params.uid});
        res.json(removedCarrier);
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
        const updatedCarrier = await Carrier.updateOne({_id: req.params.uid}, {addressId: savedAddress.id});
        res.json(savedAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Read Address by id
router.get('/:uid/address', async (req, res)=>{
    try{
        const carrier = await Carrier.findById(req.params.uid);
        const carrierAddress = await Address.findById(carrier.addressId);
        res.json(carrierAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Update Address 
router.put('/:uid/address', async (req, res)=>{
    try{
        const carrier = await Carrier.findById(req.params.uid);
        const updatedCarrierAddress = await Address.updateOne({_id: carrier.addressId}, req.body);
        res.json(updatedCarrierAddress);
    }catch(err){
        res.json({message: err});
    }
});

//Delete Carrier 
router.delete('/:uid/address', async (req, res)=>{
    try{
        const carrier = await Carrier.findById(req.params.uid);
        const removedCarrierAddress = await Address.deleteOne({_id: carrier.addressId});
        const updatedCarrier = await Carrier.updateOne({_id: req.params.uid}, {addressId: 'none'});
        res.json(removedCarrierAddress);
    }catch(err){
        res.json({message: err});
    }
});

// Carrier License CRUD
//Create a new License
router.post('/:uid/license' , async (req,res)=>{
    const license = new License(req.body);
    try{
        const savedLicense = await license.save();
        const updatedCarrier = await Carrier.updateOne({_id: req.params.uid}, {licenseId: savedLicense.id});
        res.json(savedLicense);
    }catch(err){
        res.json({message: err});
    }
});

//Read License by id
router.get('/:uid/license', async (req, res)=>{
    try{
        const carrier = await Carrier.findById(req.params.uid);
        const carrierLicense = await License.findById(carrier.licenseId);
        res.json(carrierLicense);
    }catch(err){
        res.json({message: err});
    }
});

//Update License 
router.put('/:uid/license', async (req, res)=>{
    try{
        const carrier = await Carrier.findById(req.params.uid);
        const updatedCarrierLicense = await License.updateOne({_id: carrier.licenseId}, req.body);
        res.json(updatedCarrierLicense);
    }catch(err){
        res.json({message: err});
    }
});

//Delete License 
router.delete('/:uid/license', async (req, res)=>{
    try{
        const carrier = await Carrier.findById(req.params.uid);
        const removedCarrierLicense = await License.deleteOne({_id: carrier.licenseId});
        const updatedCarrier = await Carrier.updateOne({_id: req.params.uid}, {licenseId: 'none'});
        res.json(removedCarrierLicense);
    }catch(err){
        res.json({message: err});
    }
});

//Other Options
// Get all orders associated with the carrier
router.get('/:uid/orders', async (req, res)=>{
    try{
        const orders = await Order.find({carrierid: req.params.uid});
        res.json(orders);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;