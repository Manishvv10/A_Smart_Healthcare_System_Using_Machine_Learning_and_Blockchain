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
const mongoose = require('mongoose');

const JWT_SECRET = "skullcrusher@1963";

// ROUTE 1 : Add a new appointment : POST "/api/appointments/takeappointment". Login required.

router.post('/takeappointment', fetchPatient, async (req, res) => {
    try {
        const { appointmentDate, appointmentTime, doctorId,referredTo } = req.body;
        let patient = await Patient.findById(req.patient.id); 
        let doctor = await Doctor.findById(doctorId);
        const appointment = new Appointments({
            patient:req.patient.id,
            doctor:req.body.doctorId,
            patientfname: patient.fname,
            patientlname: patient.lname,
            patientGender:patient.gender,
            patientEmail: patient.email,
            mobileno: patient.mobileno,
            doctorfname: doctor.fname,
            doctorlname:doctor.lname,
            doctorFees:doctor.fees,
            appointmentDate:appointmentDate,
            appointmentTime:appointmentTime,
            referredTo:referredTo
        })

        const savedAppointment = await appointment.save();

        res.json({ savedAppointment });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2 : Get all the patient appointments : GET "/api/appointments/fetchallappointments. Login required.

router.get('/fetchallappointments', fetchPatient, async (req, res) => {
    try {
        const appointments = await Appointments.find({ patient: req.patient.id })
        res.json(appointments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4 : Get an appointment by id : GET "/api/appointments/fetchappointmentbyid.No  Login required.

router.get('/fetchappointmentbyid/:id', async (req, res) => {
    try {
        const appointment = await Appointments.findById(req.params.id)
        res.json(appointment);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 : Get all the doctor appointments : GET "/api/appointments/fetchalldocappointments. Login required.

router.get('/fetchalldocappointments', fetchDoctor, async (req, res) => {
    try {
        const appointments = await Appointments.find({ doctor: req.doctor.id })
        res.json(appointments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2 : Cancel the appointment : PUT "/api/appointments/cancelappointment. Login required.
router.put('/cancelappointment/:id', fetchPatient, async (req, res) => {
    try {

        //find the node to be updated and update it
        let appointment = await Appointments.findById(req.params.id);
        if (!appointment) {
            res.status(404).send("Appointment Not Found");
        }

        //Allow Updation only if user owns this note
        if (appointment.patient.toString() !== req.patient.id) {
            res.status(401).send("Unauthorized Access!!");
        }

        appointment = await Appointments.findByIdAndUpdate(req.params.id, { $set: {userAppointmentStatus:false} }, { new: true });
        res.json(appointment);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 : Cancel the appointment by doctor : PUT "/api/appointments/cancelAppointmentdoctor. Login required.
router.put('/cancelAppointmentdoctor/:id', fetchDoctor, async (req, res) => {
    try {

        //find the node to be updated and update it
        let appointment = await Appointments.findById(req.params.id);
        if (!appointment) {
            res.status(404).send("Appointment Not Found");
        }

        //Allow Updation only if user owns this note
        if (appointment.doctor.toString() !== req.doctor.id) {
            res.status(401).send("Unauthorized Access!!");
        }

        appointment = await Appointments.findByIdAndUpdate(req.params.id, { $set: {doctorAppointmentStatus:false} }, { new: true });
        res.json(appointment);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 4 : Deleting a Appointment from list : DELETE "/api/appointments/deleteappointment". Login required.

router.delete('/deleteappointment/:id', fetchPatient, async (req, res) => {
    try {
        //find the node to be deleted and delete it
        let appointment = await Appointments.findById(req.params.id);
        if (!appointment) {
            res.status(404).send("Note Not Found");
        }

        //Allow Deletion only if user owns this note
        if (appointment.patient.toString() !== req.patient.id) {
            res.status(401).send("Unauthorized Access!!");
        }

        appointment = await Appointments.findByIdAndDelete(req.params.id);
        res.json({message:"Success!! Note has been deleted"});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router;
