const mongoose = require('mongoose');
const {Schema} = mongoose;

const AppointmentsSchema = new Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    patientfname:{
        type:String,
    },
    patientlname:{
        type:String,
    },
    patientEmail:{
        type:String,
        required:true,
    },
    mobileno:{
        type:String,
    },
    doctorfname:{
        type:String,
    },
    doctorlname:{
        type:String,
    },
    doctorFees:{
        type:Number,
    },
    appointmentDate:{
        type:Date,
    },
    appointmentTime:{
        type:Date,
    },
    userAppointmentStatus:{
        type:Boolean,
        default:true
    },
    doctorAppointmentStatus:{
        type:Boolean,
        default:true
    },
    referredTo:{
        type:String,
        default:''
    },
    patientGender:{
        type:String,
    },
});


const Appointments = mongoose.model('appointments',AppointmentsSchema);

module.exports = Appointments;