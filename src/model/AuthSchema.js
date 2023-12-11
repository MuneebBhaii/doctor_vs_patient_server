const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema(
    {
        _id:mongoose.Types.ObjectId,
        fullname:{type: String , required: true},
        email:{type: String , unique:true , required: true},
        dob:{type: String , required: true},
        number:{type: String , required: true},
        roll:{type: String , required: true},
        password:{type: String , required: true},
        status:Boolean,
    },
    {versionKey:false}
)
const AdminAuth = mongoose.model('auths',AuthSchema)
module.exports = AdminAuth