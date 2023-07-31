const express = require("express");
const router = express.Router();
const Appointments = require('../models/Appointments')
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchDoctor = require('../middleware/fetchDoctor');
const fetchPatient = require("../middleware/fetchPatient");
const fetchAppointment = require("../middleware/fetchAppointment")
const mongoose = require('mongoose');
const Prescriptions = require("../models/Prescriptions");
const contactQueries = require('../models/contactQueries');

const JWT_SECRET = "skullcrusher@1963";

// ROUTE 1 : Add a new query : POST "/api/query/newquery". No Login required.

router.post('/newquery',async (req, res) => {
    try {
        const { patientId,fname, lname, email,mobileno,address,query} = req.body;
        let patient = await Patient.findById(patientId);
        let contactquery ;
        if(patient){
            contactquery = await contactQueries.create({
                patient:patient._id,
                fname: patient.fname,
                lname: patient.lname,
                email: patient.email,
                mobileno: patient.mobileno,
                address:patient.address,
                query:query
            });
        }
        else{
                contactquery = await contactQueries.create({
                    patient:patientId,
                    fname: fname,
                    lname: lname,
                    email: email,
                    mobileno: mobileno,
                    address:address,
                    query:query
                });
        }
        res.json({ contactquery });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2 : Get all the prescriptions : GET "/api/prescription/fetchallprescriptions Login required.

router.get('/fetchallprescriptions', fetchDoctor, async (req, res) => {
    try {
        const prescriptions = await Prescriptions.find({ doctor: req.doctor.id })
        res.json(prescriptions);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 : Edit the prescription : PUT "/api/prescription/editprescription. Login required.
router.put('/editprescription/:id', fetchDoctor, async (req, res) => {
    try {
        const { disease, allergy, doctorPrescription } = req.body;

        const newPrescription = {};
        if (disease) { newPrescription.disease = disease };
        if (allergy) { newPrescription.allergy = allergy };
        if (doctorPrescription) { newPrescription.doctorPrescription = doctorPrescription };

        //find the node to be updated and update it
        let prescription = await Prescriptions.findById(req.params.id);
        if (!prescription) {
            res.status(404).send("Prescription Not Found");
        }

        //Allow Updation only if user owns this note
        if (prescription.doctor.toString() !== req.doctor.id) {
            res.status(401).send("Unauthorized Access!!");
        }

        prescription = await Prescriptions.findByIdAndUpdate(req.params.id,{ $set: newPrescription }, { new: true });
        res.json(prescription);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 4 : Deleting a Appointment from list : DELETE "/api/prescription/deleteprescription". Login required.

router.delete('/deleteprescription/:id', fetchDoctor, async (req, res) => {
    try {
        //find the node to be deleted and delete it
        let prescription = await Prescriptions.findById(req.params.id);
        if (!prescription) {
            res.status(404).send("Note Not Found");
        }

        //Allow Deletion only if user owns this note
        if (prescription.doctor.toString() !== req.doctor.id) {
            res.status(401).send("Unauthorized Access!!");
        }

        prescription = await Prescriptions.findByIdAndDelete(req.params.id);
        res.json({message:"Success!! Note has been deleted"});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router;
