import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { reportGenAuth } from './reportGenAuthWrapper.js';
const app = express();
const port = 5010 || process.env.PORT;
import bodyParser from 'body-parser';

app.use(bodyParser.json());


app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb://127.0.0.1:27017/ML_Disease_Detection';

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>{console.log("Connected to MongoDB Successfully !!!");})
    .catch((err)=>{console.log("Some Error Occured !! " + err)});
}

connectToMongo();

//Available Routes
app.use('/api/auth/reportGen',reportGenAuth);

app.listen(port,()=>{
    console.log("Thyroid Detection Backend Server Running on http://localhost:"+port)
})
