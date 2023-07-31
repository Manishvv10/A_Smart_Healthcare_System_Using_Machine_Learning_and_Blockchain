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

const PatientSchema = new Schema({
    aadharNo:{
        type:Number,
        required:true
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
        unique:true
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

PatientSchema.pre('save', function(next) {
    this.age = age(this.dob);
    next();
  });

const Patient = mongoose.model('patient',PatientSchema);
module.exports = Patient;