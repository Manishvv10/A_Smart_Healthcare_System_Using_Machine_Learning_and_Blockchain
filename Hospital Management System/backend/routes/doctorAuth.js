const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient');
const Receptionist = require('../models/Receptionist');
const fetchDoctor = require('../middleware/fetchDoctor');
const fetchPatient = require("../middleware/fetchPatient");
const fetchReceptionist = require("../middleware/fetchReceptionist");

const JWT_SECRET = "skullcrusher@1963";

// ROUTE 1 : Register a Doctor using : POST "/api/auth/doctor/registerdoctor" Login required.
router.post(
    "/registerdoctor",fetchReceptionist,
    [
        body("fname", "The name must be atleast 3 characters!!").isLength({
            min: 3,
        }),
        body("lname", "The name must be atleast 3 characters!!").isLength({
            min: 3,
        }),
        body("password", "The password must be atleast 5 characters!!").isLength({
            min: 5,
        }),
        body("email", "Please Enter a valid email!!").isEmail(),
        body("mobileno", "The mobile no. must be of 10 digits!!").isLength({
            min: 10,
        }),
    ],
    async (req, res) => {
        // if there are errors return Bad Request and errors
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        // check whether doctor with same email exists
        try {
            const receptionistId = req.receptionist.id;
            const receptionist = await Receptionist.findById(receptionistId).select("-password");
            if (!receptionist) {
                return res.status(401).send("Unauthorized Access!!");
            }

            let doctor = await Doctor.findOne({ email: req.body.email });
            if (doctor) {
                return res
                    .status(400)
                    .json({ error: "Sorry a doctor with same email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //Create a new doctor
            doctor = await Doctor.create({
                fname: req.body.fname,
                lname: req.body.lname,
                gender: req.body.gender,
                email: req.body.email,
                password: secPass,
                mobileno: req.body.mobileno,
                dob:req.body.dob,
                speciality: req.body.speciality,
                fees: req.body.fees,
                qualification: req.body.qualification,
                experience: req.body.experience,
            });

            const data = {
                doctor: {
                    id: doctor.id,
                },
            };

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success,authToken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE2 : Authenticate a Doctor using : POST "/api/auth/doctor/doctorlogin" No login required.
router.post(
    "/doctorlogin",
    [
        body("email", "Please Enter a valid email!!").isEmail(),
        body("password", "Password Cannot be blank!!").exists(),
    ],
    async (req, res) => {

        let success = false;
        // if there are errors return Bad Request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let doctor = await Doctor.findOne({ email });
            if (!doctor) {
                success = false;
                return res
                    .status(400)
                    .json({ success,error: "Please Enter Correct Credentials!!" });
            }

            const passwordCompare = await bcrypt.compare(password, doctor.password);
            if (!passwordCompare) {
                return res
                    .status(400)
                    .json({ success,error: "Please Enter Correct Credentials!!" });
            }

            const payload = {
                doctor: {
                    id: doctor.id,
                },
            };

            const authToken = jwt.sign(payload, JWT_SECRET);
            success =true;
            res.json({ success,authToken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 3:Get logged-in doctor details using : POST /api/auth/doctor/getdoctor. Login Required
router.post(
    "/getdoctor",
    fetchDoctor,
    async (req, res) => {
        try {
            const doctorId = req.doctor.id;
            const doctor = await Doctor.findById(doctorId).select("-password");
            res.send(doctor)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 4:Get doctor details for logged-in user details using : POST /api/auth/doctor/getdoctorfees. Login Required
router.post(
    "/getdoctorfees",
    fetchPatient,
    async (req, res) => {
        try {
            const patientId = req.patient.id;
            const patient = await Patient.findById(patientId).select("-password");
            if(!patient){
                return res.status(500).send("Internal Server Error");
            }
            const doctor = await Doctor.findById(req.body.docid).select("-password");
            let fees = doctor.fees;
            res.send({fees})
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 5:Get doctor details using specialization of doctor : POST /api/auth/doctor/getdoctordetailsbyspecialization. Login Required
router.post(
    "/getdoctordetailsbyspecialization",
    fetchPatient,
    async (req, res) => {
        try {
            const patientId = req.patient.id;
            const patient = await Patient.findById(patientId).select("-password");
            if(!patient){
                return res.status(500).send("Internal Server Error");
            }
            const doctor = await Doctor.find({speciality:req.body.speciality}).select("-password");
            res.send(doctor)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }

    }
);

// ROUTE 6:Delete a doctor using Id of doctor : DELETE /api/auth/doctor/deletedoctorbyid. Login Required
router.delete(
    "/deletedoctorbyid",
    fetchReceptionist,
    async (req, res) => {
        try {
            const receptionistId = req.receptionist.id;
            const receptionist = await Receptionist.findById(receptionistId).select("-password");
            if (!receptionist) {
                return res.status(401).send("Unauthorized Access!!");
            }
            const doctor = await Doctor.findByIdAndDelete(req.body.doctorId)
            res.send(doctor);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }

    }
);

module.exports = router;
