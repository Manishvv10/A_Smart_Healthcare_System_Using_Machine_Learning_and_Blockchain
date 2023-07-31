import React, { useState } from "react";
import patientContext from "./patientContext";

const PatientState = (props) => {
    const host = 'http://127.0.0.1:5000/';
    const appointmentsIntial = [];
    const prescriptionsIntial = [];
    const emergencyCasesIntial = [];

    const [appointments, setAppointments] = useState(appointmentsIntial);
    const [prescriptions, setPrescriptions] = useState(prescriptionsIntial);
    const [emergencyCases, setEmergencyCases] = useState(emergencyCasesIntial);
    const [patientDetails, setPatientDetails] = useState(null);
    

    //Get all appointments
    const fetchallappointments = async ()=>{
        //API call
        const url = `${host}api/appointments/fetchallappointments`;
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setAppointments(json);
    }

    //Get logged-in patient details
    const getpatientdetails = async ()=>{
        //API call
        const url = `${host}api/auth/patient/getpatient`;
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setPatientDetails(json);
    }
    
    //Get patient details by patient id
    const getpatientdetailsbyid = async (id)=>{
        //API call
        const url = `${host}api/auth/patient/getpatientbyid`;
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-type':"application/json",
            },
            body:JSON.stringify({patientId : id})
        });
        const json = await response.json();
        // console.log(json)
        setPatientDetails(json);
    }

    //Get patient details by patient by aadharNo
    const getpatientdetailsbyaadhar = async (aadharNo)=>{
        //API call
        const url = `${host}api/auth/patient/getpatientbyaadhar`;
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-type':"application/json",
            },
            body:JSON.stringify({aadharNo : aadharNo})
        });
        const json = await response.json();
        // console.log(json)
        setPatientDetails(json);
    }

    //Take an appointment : Takes an json object appt
    const takeAppointment = async (date,time,doctorId,specialization)=>{
       console.log("Adding a new Note")
       const url = `${host}api/appointments/takeappointment`;
       const response = await fetch(url, {
           method: 'POST',
           headers: {
               'Content-type': "application/json",
               'auth-token': localStorage.getItem('token')
           },
           body: JSON.stringify({ appointmentDate:new Date(date),appointmentTime:new Date(date+" "+time),doctorId:doctorId ,referredTo:specialization})
       });
       const json = await response.json();
       console.log(json);
        setAppointments(appointments.concat(json));
    }

    //Deleting an Appointment from the list
    const deleteAppointment = async (id)=>{
        console.log("Deleting the appointment with id: "+ id)
        const url = `${host}api/appointments/deleteappointment/${id}`;
        const response = await fetch(url,{
            method:'DELETE',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        fetchallappointments();
    }

    //Cancel an Appointment : set userAppointmentStatus to false
    const cancelAppointment = async (id)=>{
        // API Call
        const url = `${host}api/appointments/cancelappointment/${id}`;
        const response = await fetch(url,{
            method:'PUT',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });

        const json = await response.json();
        console.log(json);
        fetchallappointments();
    }

    const fetchallprescriptions = async ()=>{
        //API call
        const url = `${host}api/prescription/fetchallprescriptions`;
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setPrescriptions(json);
    }

    const fetchallpatientemergency = async ()=>{
        //API call
        const url = `${host}api/emergency/fetchallpatientemergency`;
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setEmergencyCases(json);
    }

    



    return (
        <patientContext.Provider value={{ appointments,prescriptions,emergencyCases,patientDetails, fetchallappointments,takeAppointment,cancelAppointment,deleteAppointment,fetchallprescriptions,fetchallpatientemergency,getpatientdetails,getpatientdetailsbyid }}>
            {props.children}
        </patientContext.Provider>
    )
}

export default PatientState;