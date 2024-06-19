const { body, validationResult } = require('express-validator');
const express = require('express')
const router =express.Router()
const user =require("../Schemas/UserSchemas.js")
const jwt = require('jsonwebtoken');
const bcrypt=require("bcryptjs")
const SignJWT="Test123"

// Route 1  {Post} create user API url: /api/user/foodapp/createuser {Post}
router.post("/foodapp/createuser",[
    body("Email").isEmail(),
    body("Name","Please enter the name more than 3 characters").isLength({min:2}),
    body("Password","Please enter the Password more than 3 characters").isLength({min:2}),
    body("PhoneNumber","Password should not be less than 5 characters").isLength({max:10})
], async(req,res)=>
    {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({success,errors: errors.array() });//sending bad request when error accoured
    }
    try
    {
        let User=await user.findOne({success,Email:req.body.Email})
        if(User)
        {
           return res.status(400).json({success,error:"user already exists"})
        }
        const salt = await bcrypt.genSaltSync(10); // creating salt for the password 
        const SecPas= await bcrypt.hashSync(req.body.Password, salt);

        User=user.create({
            Name:req.body.Name,
            Email:req.body.Email,
            Password:SecPas,
            PhoneNumber:req.body.PhoneNumber
         })

        data={
            user:User.id
        }
        let token=jwt.sign(data,SignJWT)
        success=true
        res.json({success,token})
    }
    catch(error)
    {
        res.status(500).json({success,error:"Internal sever error"})
        console.log(error)
    }
    }
)
// Route 2 {Post} Login user API url: /api/user/foodapp/loginuser {Post}
router.post("/foodapp/loginuser",[
    body("Email").isEmail(),
    body("Password","Password should not be less than 5 characters").exists()
], async(req,res)=>
    {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({success,errors: errors.array() });//sending bad request when error accoured
    }
    const {Email,Password}=req.body
    try
    {
        let User= await user.findOne({Email})
        if(!User)
        {
           return res.status(400).send({success,error:"Invalid Credentials"})
        }
        const passwordCompare= await bcrypt.compare(Password,User.Password)
        if(!passwordCompare)
            {
                success=false;
                return res.status(400).json({success,erro:"please enter valid credentials"})//sending bad request when error accoured
            }
        data={
            user:User.id
        }
        const token = jwt.sign(data,SignJWT);// creating a JasonWebToken to generate a unique token for decreasing the chance of a hacker to hack our website later verify that token to login into our website 
       success=true;
       res.json({success,token})
    }
    catch(error)
    {
        res.status(400).send({success,error:"Internal Server Error"})
        console.log(error)
    }
    }
)
module.exports=router