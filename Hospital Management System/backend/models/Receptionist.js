const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReceptionistSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otherReceptionist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'receptionist'
    }
});

const Receptionist = mongoose.model('receptionist',ReceptionistSchema);
module.exports = Receptionist;