const mongoose = require('mongoose');
const {Schema} = mongoose;

// generateEmployeeId = ()=> {
//     // const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     // let id = '';
//     // for (let i = 0; i < 24; i++) {
//     //   const randomIndex = Math.floor(Math.random() * chars.length);
//     //   id += chars[randomIndex];
//     // }
//     // let ObjId = new mongoose.Types.ObjectId(id);
//     // return ObjId;
//     const id = "123456789101112131415161";
//     let ObjId = new mongoose.Types.ObjectId(id);
//     return ObjId;
// }

const age = (dob)=>{
    let a = new Date();
    let currentDateTime = a.getTime();
    let dobDateTime = dob.getTime();
    let diff = currentDateTime - dobDateTime;
    let age = Math.floor(diff / (1000 * 60 * 60 * 24*365));
    return age ;
}

const DoctorSchema = new Schema({
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
    password:{
        type:String,
        required:true
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
    speciality:{
        type:String,
        required:true,
    },
    fees:{
        type:Number,
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
    },
});

DoctorSchema.pre('save', function(next) {
    this.age = age(this.dob);
    next();
  });

const Doctor = mongoose.model('doctor',DoctorSchema);
module.exports = Doctor;