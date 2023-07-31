const mongoose = require('mongoose');
const {Schema} = mongoose;

const PrescriptionsSchema = new Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    appointment:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'appointments'
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
    appointmentDate:{
        type:Date,
    },
    appointmentTime:{
        type:Date,
    },
    disease:{
        type:String,
    },
    allergy:{
        type:String,
    },
    doctorPrescription:{
        type:String,
    },
    referredTo:{
        type:String,
    },
});

const Prescriptions = mongoose.model('prescriptions',PrescriptionsSchema);

module.exports = Prescriptions;