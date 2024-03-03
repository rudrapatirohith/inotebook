const express=require('express');
const router= express.Router();
const User=require('../models/User.js');
const {body, validationResult}=require('express-validator');

//create a User using: POST "/api/auth/". Doesnt require Auth
router.post('/',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:4})   
],(req,res)=>{
    console.log(req.body); //prints the req which we gave in body
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const user=User(req.body);// create a varibale and store the data which we have given as per user.js schema in thunder client
    user.save() //saves that schema or db in the mongoose db through the db which we gave for connection

    res.send(req.body) //gives response 
})

module.exports=router