const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Receptionist = require('../models/Receptionist');
const fetchReceptionist = require('../middleware/fetchReceptionist');
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointments = require("../models//Appointments");

const JWT_SECRET = "skullcrusher@1963";

// ROUTE 1 : Create a new receptionist ID using : POST "/api/reception/registerreceptionist" Login required.
// For first time usage , remove the given below fetchReceptionist middleware function and then insert entries 
router.post(
    "/registerreceptionist",fetchReceptionist,
    [
        body("email", "The username must be atleast 3 characters!!").isEmail(),
        body("password", "The password must be atleast 5 characters!!").isLength({
            min: 5,
        })
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
            let receptionist = await Receptionist.findOne({ email: req.body.email });
            if (receptionist) {
                return res
                    .status(400)
                    .json({ error: "Sorry a receptionist with same username already exists" });
            }
            
            // Remove the below 3 Lines of code along with the fetchReceptionist middleware function for First Time Use when there are no entries in receptionist collection
            receptionist = await Receptionist.findById(req.receptionist.id).select("-password");
            if (!receptionist) {
                return res.status(401).send("Unauthorized Access!!");
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //Create a new receptionist
            receptionist = await Receptionist.create({
                email:req.body.email,
                password:secPass,
            });

            const data = {
                receptionist: {
                    id: receptionist.id,
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

// ROUTE2 : Authenticate an receptionist using : POST "/api/reception/receptionistlogin" No login required.
router.post(
    "/receptionistlogin",
    async (req, res) => {

        let success = false;
        // if there are errors return Bad Request and errors

        const { email, password } = req.body;
        try {
            let receptionist = await Receptionist.findOne({ email });
            if (!receptionist) {
                success = false;
                return res
                    .status(400)
                    .json({ success,error: "Please Enter Correct Credentials!!" });
            }

            const passwordCompare = await bcrypt.compare(password, receptionist.password);
            if (!passwordCompare) {
                return res
                    .status(400)
                    .json({ success,error: "Please Enter Correct Credentials!!" });
            }

            const payload = {
                receptionist: {
                    id: receptionist.id,
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

// ROUTE 3:Get logged-in receptionist details using : POST /api/recepetion/getreceptionist. Login Required
router.post(
    "/getreceptionist",
    fetchReceptionist,
    async (req, res) => {
        try {
            const receptionistId = req.receptionist.id;
            const receptionist = await Receptionist.findById(receptionistId).select("-password");
            res.send(receptionist)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 4:Get all doctor details using : POST /api/recepetion/getalldoctors. Login Required
router.get(
    "/getalldoctors",
    fetchReceptionist,
    async (req, res) => {
        try {
            const receptionistId = req.receptionist.id;
            const receptionist = await Receptionist.findById(receptionistId).select("-password");
            if (!receptionist) {
                return res.status(401).send("Unauthorized Access!!");
            }
            const doctors = await Doctor.find();
            res.send(doctors)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 5:Get all patient details using : POST /api/recepetion/getallpatients. Login Required
router.get(
    "/getallpatients",
    fetchReceptionist,
    async (req, res) => {
        try {
            const receptionistId = req.receptionist.id;
            const receptionist = await Receptionist.findById(receptionistId).select("-password");
            if (!receptionist) {
                return res.status(401).send("Unauthorized Access!!");
            }
            const patient = await Patient.find();
            res.send(patient)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 6:Get all appointments details using : POST /api/recepetion/getallappointments. Login Required
router.get(
    "/getallappointments",
    fetchReceptionist,
    async (req, res) => {
        try {
            const receptionistId = req.receptionist.id;
            const receptionist = await Receptionist.findById(receptionistId).select("-password");
            if (!receptionist) {
                return res.status(401).send("Unauthorized Access!!");
            }
            const appointments = await Appointments.find();
            res.send(appointments)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;
