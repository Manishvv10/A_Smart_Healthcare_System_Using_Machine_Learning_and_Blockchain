const mongoose = require('mongoose');
const {Schema} = mongoose;

const DocFormatSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    userfname:{
        type:String,
    },
    userlname:{
        type:String,
    },
    email:{
        type:String,
    },
    mobileno:{
        type:String,
    },
    usergivendocName:{
        type:String,
    },
    docName:{
        type:String,
    },
    docDescription:{
        type:String,
    },
    docCID:{
        type:String,
    },
    docRootCid:{
        type:String,
    },
    uploadedAt:{
        type:Date,
        default:Date.now
    },
});

const docFormat = mongoose.model('docformat',DocFormatSchema);
module.exports = docFormat;