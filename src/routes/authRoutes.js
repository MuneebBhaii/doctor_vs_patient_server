const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const Auth = require("../model/AuthSchema")

router.post('/register', async (req, res) => {
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    const userDate = new Auth({
        _id: new mongoose.Types.ObjectId,
        fullname: req.body.fullname,
        email:req.body.email,
        dob:req.body.dob,
        number:req.body.number,
        roll:req.body.roll,
        password: hashedpassword,
        status:false,
    })
    try {
        const user = await userDate.save()
        return res.status(200).json({ message: "account created successfully", user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get('/login', async (req, res) => {
    const user = await Auth.findOne({ email: req.body.email })
    if (!user) {
        return res.status(200).json({ message: "Account not found" })
    }
    if(user.roll != req.body.roll) {
        return res.status(200).json({ message: "Not register as this roll" })
    }
    const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if(!passwordMatch) {
        return res.status(200).json({ message: "password mismatch" })
    }
    
    const token = jwt.sign({user} , process.env.SECURE_KEY)
  return  res.status(200).json({ message:"successfully login ", token })
})

module.exports = router