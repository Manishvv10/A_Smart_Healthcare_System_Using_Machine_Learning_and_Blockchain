const mongoose = require('mongoose');
const {Schema} = mongoose;

const age = (dob)=>{
    let a = new Date();
    let currentDateTime = a.getTime();
    let dobDateTime = dob.getTime();
    let diff = currentDateTime - dobDateTime;
    let age = Math.floor(diff / (1000 * 60 * 60 * 24*365));
    return age ;
}

const UserSchema = new Schema({
    aadharNo:{
        type:Number,
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
    registrationdate:{
        type:Date,
        default:Date.now
    },
});

UserSchema.pre('save', function(next) {
    this.age = age(this.dob);
    next();
  });

const User = mongoose.model('user',UserSchema);
module.exports = User;