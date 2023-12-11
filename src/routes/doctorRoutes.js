const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Doctor = require('../model/DoctorSchema')

router.post('/doctordetails', async(req, res) => {
    const doctorData = new Doctor({
        _id: new mongoose.Types.ObjectId,
        fullname:req.body.fullname,
        email:req.body.email,
        specialization:req.body.specialization,
        schedule:{
            day:req.body.day,
            time:req.body.time,
        },
        slot:{
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            available:req.body.available,
        }
    })
    try {
        const user = await doctorData.save()
        return res.status(200).json({ message: "details save successfully", user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = router