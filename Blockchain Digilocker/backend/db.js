const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/Blockchain-Digilocker';

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>{console.log("Connected to MongoDB Successfully !!!");})
    .catch((err)=>{console.log("Some Error Occured !! " + err)});
}

module.exports = connectToMongo;