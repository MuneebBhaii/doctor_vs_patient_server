const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema(
    {
        _id:mongoose.Types.ObjectId,
        fullname:{type: String , required: true},
        specialization:{type: String , required: true},
        email:{type: String , unique:true , required: true},
        schedule:{
            day:{Array , required: true},
            time:{Array , required: true},
        },
        slot:{
            startTime: {String , required: true},
            endTime: {String , required: true},
            available:{Array , required: true},
        }
    },
    {versionKey:false}
)
const AdminAuth = mongoose.model('doctors',DoctorSchema)
module.exports = AdminAuth