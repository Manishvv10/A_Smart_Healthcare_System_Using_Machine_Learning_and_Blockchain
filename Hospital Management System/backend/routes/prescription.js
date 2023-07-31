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

const JWT_SECRET = "skullcrusher@1963";

// ROUTE 1 : Add a new prescription : POST "/api/prescription/newprescription". Login required.

router.post('/newprescription/:id', fetchDoctor,async (req, res) => {
    try {
        const { disease, allergy, doctorPrescription} = req.body;
        let doctor = await Doctor.findById(req.doctor.id);
        let appointment = await Appointments.findById(req.params.id);
        const prescription = new Prescriptions({
            patient:appointment.patient,
            doctor:req.doctor.id,
            appointment:appointment._id,
            patientfname: appointment.patientfname,
            patientlname: appointment.patientlname,
            patientEmail: appointment.patientEmail,
            mobileno: appointment.mobileno,
            doctorfname: doctor.fname,
            doctorlname: doctor.lname,
            appointmentDate:appointment.appointmentDate,
            appointmentTime:appointment.appointmentTime,
            disease:disease,
            allergy:allergy,
            doctorPrescription:doctorPrescription,
            referredTo:appointment.referredTo
        })

        const savedPrescription = await prescription.save();

        res.json({ savedPrescription });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2 : Get all the prescriptions for patient : GET "/api/prescription/fetchallprescriptions Login required.

router.get('/fetchallprescriptions', fetchPatient, async (req, res) => {
    try {
        const prescriptions = await Prescriptions.find({ patient: req.patient.id })
        res.json(prescriptions);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 : Get the prescriptions by id for patient : GET "/api/prescription/fetchaprescriptionbyid Login required.

router.post('/fetchaprescriptionbyid', async (req, res) => {
    try {
        const prescription = await Prescriptions.findById(req.body.id )
        res.json(prescription);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 : Get all the prescriptions for doctor : GET "/api/prescription/fetchalldocprescriptions Login required.

router.get('/fetchalldocprescriptions', fetchDoctor, async (req, res) => {
    try {
        const prescriptions = await Prescriptions.find({ doctor: req.doctor.id })
        res.json(prescriptions);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4 : Edit the prescription : PUT "/api/prescription/editprescription. Login required.
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
