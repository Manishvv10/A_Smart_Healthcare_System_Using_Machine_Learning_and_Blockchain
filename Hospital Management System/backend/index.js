const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors());

//Available Routes
app.use('/api/auth/patient',require('./routes/patientAuth'));
app.use('/api/auth/doctor',require('./routes/doctorAuth'));
app.use('/api/appointments',require('./routes/appointments'));
app.use('/api/reception',require('./routes/reception'));
app.use('/api/prescription',require('./routes/prescription'));
app.use('/api/emergency',require('./routes/emergency'));
app.use('/api/query',require('./routes/contactQuery'));

app.listen(port,()=>{
    console.log("Hospital-Management-System Backend Server Running on http://localhost:"+port)
})