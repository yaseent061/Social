const express = require('express');
const {check,validationResult} = require("express-validator");
const User = require('../../models/User')
const gravatar = require('gravatar')
const bycrypt = require('bcryptjs')

const router = express.Router();

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('password','Please enter a password with length 6 or more').isLength({min:6}),
    check('email','Please enter a valid Email').isEmail()
],async (req,res)=>{
    console.log(req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        })
    }

    const {name, email, password} = req.body;
    try{
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({errors:[{msg : "User already exists"}]})
        }

        const avatar = gravatar.url(email,{
            s: 200,
            r:"pg",
            d:"mm"
        })
        user = new User({
            name,
            email,
            password,
            avatar
        }) 

        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(password,salt);

        user.save();
        res.send("User registered successfully")
    }
    catch(err){
        return res.status(500).send("Server error")
    }
})

module.exports = router