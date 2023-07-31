const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const Doctor = require('../models/Doctor');
const Patient = require("../models/Patient");
const Emergency = require("../models/Emergency");
const Receptionist = require("../models/Receptionist");4
const fetchPatient = require("../middleware/fetchPatient");
const fetchReceptionist = require("../middleware/fetchReceptionist");
const fetchDoctor = require('../middleware/fetchDoctor');

const JWT_SECRET = "skullcrusher@1963";

// ROUTE 1 : Admit an Emergency Case Patient using : POST "/api/emergency/admitpatient" No login required.
router.post(
    "/admitpatient",
    async (req, res) => {
        try {
            const {aadharNo,fname,lname,gender,dob,email,address,mobileno,casualtyDescription,casualtyLevel} = req.body
            // check whether patient with same email exists
            
            let patientDetails = await Patient.findOne({email:email});
            if (!patientDetails) {
                // const salt = await bcrypt.genSalt(10);
                // const secPass = await bcrypt.hash(password, salt);    
                const newPatient = await Patient.create({
                aadharNo:aadharNo,
                fname: fname,
                lname: lname,
                gender: gender,
                email: email,
                mobileno: mobileno,
                dob:dob,
                address:address,
                })
            }
            patientDetails = await Patient.findOne({email:email});
            //Create a new Emergency Case
            const emergencyPatient = await Emergency.create({
                patient:patientDetails._id,
                aadharNo:patientDetails.aadharNo,
                fname: patientDetails.fname,
                lname: patientDetails.lname,
                gender: patientDetails.gender,
                email: patientDetails.email,
                mobileno: patientDetails.mobileno,
                dob:patientDetails.dob,
                address:patientDetails.address,
                age:patientDetails.age,
                casualtyDescription:casualtyDescription,
                casualtyLevel:casualtyLevel
            });

            success = true;
            res.json({success,emergencyPatient });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// // ROUTE2 : Authenticate a Doctor using : POST "/api/auth/doctor/doctorlogin" No login required.
// router.post(
//     "/doctorlogin",
//     [
//         body("email", "Please Enter a valid email!!").isEmail(),
//         body("password", "Password Cannot be blank!!").exists(),
//     ],
//     async (req, res) => {

//         let success = false;
//         // if there are errors return Bad Request and errors
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ erros: errors.array() });
//         }

//         const { email, password } = req.body;
//         try {
//             let doctor = await Doctor.findOne({ email });
//             if (!doctor) {
//                 success = false;
//                 return res
//                     .status(400)
//                     .json({ success,error: "Please Enter Correct Credentials!!" });
//             }

//             const passwordCompare = await bcrypt.compare(password, doctor.password);
//             if (!passwordCompare) {
//                 return res
//                     .status(400)
//                     .json({ success,error: "Please Enter Correct Credentials!!" });
//             }

//             const payload = {
//                 doctor: {
//                     id: doctor.id,
//                 },
//             };

//             const authToken = jwt.sign(payload, JWT_SECRET);
//             success =true;
//             res.json({ success,authToken });
//         } catch (error) {
//             console.log(error.message);
//             res.status(500).send("Internal Server Error");
//         }
//     }
// );

// ROUTE 3:Get emergency cases for specific user using : GET /api/emergency/fetchallpatientemergency. Login Required
router.get(
    "/fetchallpatientemergency",
    fetchPatient,
    async (req, res) => {
        try {
            const patientId = req.patient.id;
            const patient = await Patient.findById(patientId).select("-password");
            const patientEmail = patient.email;
            const emergencyCases = await Emergency.find({email:patientEmail});
            res.json(emergencyCases);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);
// ROUTE 4:Get all emergency cases for doctor using : GET /api/emergency/fetchalldoctoremergency.
router.get(
    "/fetchalldoctoremergency",
    fetchDoctor,
    async (req, res) => {
        try {
            const doctorId = req.doctor.id;
            const doctor = await Doctor.findById(doctorId).select("-password");
            if (!doctor) {
                return res.status(401).send("Unauthorized Access!!");
            }
            const emergencyCases = await Emergency.find();
            res.json(emergencyCases);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);
// ROUTE 5:Get all emergency cases for receptionist using : GET /api/emergency/fetchallreceptionemergency.
router.get(
    "/fetchallreceptionemergency",
    fetchReceptionist,
    async (req, res) => {
        try {
            const receptionistId = req.receptionist.id;
            const receptionist = await Receptionist.findById(receptionistId).select("-password");
            if (!receptionist) {
                return res.status(401).send("Unauthorized Access!!");
            }
            const emergencyCases = await Emergency.find();
            res.json(emergencyCases);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;
