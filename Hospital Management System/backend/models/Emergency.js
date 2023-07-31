const mongoose = require('mongoose');
const {Schema} = mongoose;

const EmergencySchema = new Schema({
    aadharNo:{
        type:Number,
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobileno:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true,
    },
    age:{
        type:Number,
    },
    address:{
        type:String,
    },
    casualtyDescription:{
        type:String,
    },
    casualtyLevel:{
        type:String,
    },
    casualtyRegDate:{
        type:Date,
        default:Date.now
    },
});


const Emergency = mongoose.model('emergency',EmergencySchema);
module.exports = Emergency;