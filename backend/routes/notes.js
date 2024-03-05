const express=require('express'); //imports express
const router= express.Router(); //creates a new router object in Express.js, allowing for modular route handling by acting as a mini-app

router.get('/',(req,res)=>{
res.json([])
})

module.exports=router