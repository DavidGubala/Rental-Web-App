const express  = require('express');
const router = express.Router();
const bcrypt =  require('bcrypt');
const Login = require('../models/Login');
const Shipper = require('../models/Shipper');
const Carrier = require('../models/Carrier');
const Partner = require('../models/Partner');
const { render } = require('../app');
const jwt = require('jsonwebtoken')

const JWTsecret = 'asdlkjhas7#$%!dfajnlKLh87*&(^(*&)IUHOP)^V087g0^)GB6ybv(76b0o*&bg9'

// Login Options
// Create login // Register
router.post('/register' , async (req,res)=>{
    let userId = req.body.uid
    let pwrd  = await bcrypt.hash(req.body.pass, 10)
    let payload = {
        uid : userId,
        pass: pwrd,
    }
    const login = new Login(payload);
    try{
        const savedLogin = await login.save();
        res.json(savedLogin);
    }catch(err){
        res.json({message: err});
    }
});

// LOGIN Action
router.post('/', async (req, res)=>{
    let user = ''
    switch(req.body.loginType){
        case 'shipper':
            user = await Shipper.findOne({email: req.body.email}).lean();
            break;
        case 'carrier':
            user = await Carrier.findOne({email:  req.body.email}).lean();
            console.log(req.body)
            break;
        case 'partner':
            user = await Partner.findOne({email:  req.body.email}).lean();
            break;
    }
    const login = await Login.findOne({uid: user._id});
    if(await bcrypt.compare(login.pass, req.body.pass)) {
        const token = jwt.sign({id: login._id, uid: login.uid}, JWTsecret)
        return res.json({
            status: 'ok',
            data: token
        })
    }
    return res.json({status: 'error'})
});
/*
// Update login
router.put('/', async (req, res)=>{
    try{
        const updatedLogin = await Login.updateOne({_id: req.params.lid}, req.body);
        res.json(updatedLogin);
    }catch(err){
        res.json({message: err});
    }
});

// Delete login
router.delete('/', async (req, res)=>{
    try{
        const removedLogin = await Login.remove({_id: req.params.lid});
        res.json(removedLogin);
    }catch(err){
        res.json({message: err});
    }
});
*/

module.exports = router;