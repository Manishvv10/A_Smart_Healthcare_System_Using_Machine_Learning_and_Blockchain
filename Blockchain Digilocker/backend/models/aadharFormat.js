const mongoose = require('mongoose');
const {Schema} = mongoose;

function generateUniqueID() {
    const timestamp = Date.now().toString(); // current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // random number between 0 and 999
    const uniqueID = timestamp + randomNum.toString().padStart(3, '0'); // combine timestamp and random number
    return uniqueID;
  }  

const AadharSchema = new Schema({
    aadharNo:{
        type:Number,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    mobileno:{
        type:String,
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
    },
    address:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
});

AadharSchema.pre('save', function(next) {
    this.aadharNo = generateUniqueID();
    next();
  });

const Aadhar = mongoose.model('aadhar',AadharSchema);
module.exports = Aadhar;