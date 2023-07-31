const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactQueriesSchema = new Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
    },
    mobileno:{
        type:String,
    },
    address:{
        type:String,
    },
    query:{
        type:String,
        required:true
    }
});


const contactQueries = mongoose.model('contactQueries',contactQueriesSchema);
module.exports = contactQueries;