const express  = require('express');
const router = express.Router();
const bcrypt =  require('bcrypt');
const Login = require('../models/Login');
const Token = require('../models/Token');
const Shipper = require('../models/Shipper');
const Carrier = require('../models/Carrier');
const Partner = require('../models/Partner');
const { render } = require('../app');
const jwt = require('jsonwebtoken')

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
    //console.log(req.body)
    let user = ''
    switch(req.body.loginType){
        case 'shipper':
            user = await Shipper.findOne({email: req.body.email}).lean();
            break;
        case 'carrier':
            user = await Carrier.findOne({email:  req.body.email}).lean();
            break;
        case 'partner':
            user = await Partner.findOne({email:  req.body.email}).lean();
            break;
    }
    //console.log(user)
    const login = await Login.findOne({uid: user._id});
    console.log(login)
    
    console.log(await bcrypt.compare(req.body.pass, login.pass))

    if(await bcrypt.compare(req.body.pass, login.pass)) {
        const token = jwt.sign({userType: req.body.loginType, uid: login.uid}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
        const reftok = jwt.sign({userType: req.body.loginType, uid: login.uid}, process.env.REFRESH_TOKEN_SECRET)
        const refresh = new Token({
            uid: login.uid,
            userType: req.body.loginType,
            reftok: reftok
        })
        try{
            const savedRefresh = await refresh.save();
            return res.json({
                status: 'ok',
                token: token,
                reftoken: reftok,
                uid: refresh.uid
            })
        }catch(err){
            res.json({message: err});
        }
    }
    return res.sendStatus(403)
});

// AUTH Action
router.post('/auth', async (req, res)=>{
    //console.log(req.body)
    if(req.body.token == '0' || req.body.token == 'undefined'){
        return res.json({
            status: 'notauthenticated'
        })
    }else{
        jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) =>{
            if(err) return res.json({status : '403'})
            //console.log(authData)
            return res.json({
                status : 'ok',
                utype: authData.userType,
                uid : authData.uid
            })
        })
    }
});

// Refresh Token Action
// this runs when above sends 403
router.post('/token', async (req, res)=>{
    //console.log(req.body)
    const token = await Token.findOne({reftok: req.body.reftoken});
    if(token){
        const newAccess = jwt.sign({userType: token.userType, uid: token.uid}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
        return res.json({
            status : 'ok',
            token: newAccess
        })
    }else{
        return res.sendStatus(403)
    }
});

// Logout Action, deletes the refresh token
router.delete('/token', async (req, res)=>{
    console.log(req.body)
    const token = await Token.deleteOne({reftok: req.body.reftok});
    return res.sendStatus(204)
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