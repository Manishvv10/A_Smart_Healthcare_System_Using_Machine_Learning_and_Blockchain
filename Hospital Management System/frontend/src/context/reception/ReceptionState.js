import React, { useState } from "react";
import receptionContext from "./receptionContext";

const ReceptionState = (props) => {
    const host = 'http://127.0.0.1:5000/';
    // const prescriptionsIntial = [];
    const appointmentsIntial = [];
    const emergencyCasesIntial = [];
    const doctorsIntial = [];
    const patientsIntial = [];

    const [appointments, setAppointments] = useState(appointmentsIntial);
    // const [prescriptions, setPrescriptions] = useState(prescriptionsIntial);
    const [doctors, setDoctors] = useState(doctorsIntial);
    const [patients, setPatients] = useState(patientsIntial);
    const [emergencyCases, setEmergencyCases] = useState(emergencyCasesIntial);

    //Get all doctors
    const getalldoctors = async ()=>{
        //API call
        const url = `${host}api/reception/getalldoctors`;
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setDoctors(json);
    }

    //Get all patients
    const getallpatients = async ()=>{
        //API call
        const url = `${host}api/reception/getallpatients`;
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setPatients(json);
    }

    //Get all appointments
    const getallappointments = async ()=>{
        //API call
        const url = `${host}api/reception/getallappointments`;
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

    //Get All Emergency Cases
    const fetchallreceptionemergency = async ()=>{
        //API call
        const url = `${host}api/emergency/fetchallreceptionemergency`;
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



    // //Take an appointment : Takes an json object appt
    // const takeAppointment = async (date,time,doctorId,specialization)=>{
    //    console.log("Adding a new Note")
    //    const url = `${host}api/appointments/takeappointment`;
    //    const response = await fetch(url, {
    //        method: 'POST',
    //        headers: {
    //            'Content-type': "application/json",
    //            'auth-token': localStorage.getItem('token')
    //        },
    //        body: JSON.stringify({ appointmentDate:new Date(date),appointmentTime:new Date(date+" "+time),doctorId:doctorId ,referredTo:specialization})
    //    });
    //    const json = await response.json();
    //    console.log(json);
    //     setAppointments(appointments.concat(json));
    // }

    // //Deleting an Appointment from the list
    // const deleteAppointment = async (id)=>{
    //     console.log("Deleting the appointment with id: "+ id)
    //     const url = `${host}api/appointments/deleteappointment/${id}`;
    //     const response = await fetch(url,{
    //         method:'DELETE',
    //         headers:{
    //             'Content-type':"application/json",
    //             'auth-token':localStorage.getItem('token')
    //         },
    //     });
    //     const json = await response.json();
    //     console.log(json);
    //     getallappointments();
    // }

    // //Cancel an Appointment : set userAppointmentStatus to false
    // const cancelAppointment = async (id)=>{
    //     // API Call
    //     const url = `${host}api/appointments/cancelappointment/${id}`;
    //     const response = await fetch(url,{
    //         method:'PUT',
    //         headers:{
    //             'Content-type':"application/json",
    //             'auth-token':localStorage.getItem('token')
    //         },
    //     });

    //     const json = await response.json();
    //     console.log(json);
    //     getallappointments();
    // }
    



    return (
        <receptionContext.Provider value={{ appointments, doctors,patients,emergencyCases, getalldoctors,getallpatients,getallappointments,fetchallreceptionemergency}}>
            {props.children}
        </receptionContext.Provider>
    )
}

export default ReceptionState;