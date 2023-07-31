const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Patient = require('../models/Patient')
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchPatient = require('../middleware/fetchPatient');

const JWT_SECRET = "skullcrusher@1963";

// ROUTE 1 : Register a Patient using : POST "/api/auth/user/registerpatient"No login required.
router.post(
    "/registerpatient",
    [
        body("fname", "The name must be atleast 3 characters!!").isLength({
            min: 3,
        }),
        body("lname", "The name must be atleast 3 characters!!").isLength({
            min: 3,
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
        // check whether patient with same email exists
        try {
            let patient = await Patient.findOne({ email: req.body.email });
            if (patient) {
                return res
                    .status(400)
                    .json({ error: "Sorry a patient with same email already exists" });
            }

            // const salt = await bcrypt.genSalt(10);
            // const secPass = await bcrypt.hash(req.body.password, salt);

            //Create a new patient
            patient = await Patient.create({
                aadharNo:req.body.aadharNo,
                fname: req.body.fname,
                lname: req.body.lname,
                gender: req.body.gender,
                email: req.body.email,
                mobileno: req.body.mobileno,
                dob:req.body.dob,
                address: req.body.address,
            });

            const data = {
                patient: {
                    id: patient.id,
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

// ROUTE2 : Authenticate a Patient using : POST "/api/auth/user/patientlogin" No login required.
router.post(
    "/patientlogin",
    // [
    //     body("aadharNo", "Please Enter a valid Aadhar No.!!").isLength({min:16}),
    //     body("otp", "OTP Cannot be blank!!").exists(),
    // ],
    async (req, res) => {

        let success = false;
        // if there are errors return Bad Request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }

        const { aadharNo, email } = req.body;
        try {
            let patient = await Patient.findOne({ aadharNo:aadharNo,email:email });
            if (!patient) {
                success = false;
                return res
                    .status(400)
                    .json({ success,error: "Please Enter Correct Credentials!!" });
            }

            // const passwordCompare = await bcrypt.compare(password, patient.password);
            // if (!passwordCompare) {
            //     return res
            //         .status(400)
            //         .json({ success,error: "Please Enter Correct Credentials!!" });
            // }

            const payload = {
                patient: {
                    id: patient.id,
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

// ROUTE 3:Get logged-in patient details using : POST /api/auth/patient/getpatient. Login Required
router.post(
    "/getpatient",
    fetchPatient,
    async (req, res) => {
        try {
            const patientId = req.patient.id;
            const patient = await Patient.findById(patientId).select("-password");
            res.send(patient)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 4:Get  patient details by patient id using : POST /api/auth/patient/getpatientbyid. Login Required
router.post(
    "/getpatientbyid",
    async (req, res) => {
        try {
            const patientId = req.body.patientId;
            console.log(patientId);
            const patient = await Patient.findById(patientId);
            res.send(patient)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 4:Get  patient details by patient id using : POST /api/auth/patient/getpatientbyaadhar. Np Login Required
router.post(
    "/getpatientbyaadhar",
    async (req, res) => {
        try {
            const patientAadhar = req.body.aadharNo;
            const patient = await Patient.findOne({aadharNo:patientAadhar});
            res.send(patient)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;
