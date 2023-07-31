const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5001 || process.env.PORT;

app.use(express.json());
app.use(cors());

//Available Routes
app.use('/api/auth/user',require('./routes/userAuth'));
app.use('/api/auth/aadhar',require('./routes/userAadhar'));


app.listen(port,()=>{
    console.log("Blockchain-Digilocker Backend Server Running on http://localhost:"+port)
})