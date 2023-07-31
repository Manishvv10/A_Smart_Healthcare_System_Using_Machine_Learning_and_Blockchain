import React, { useState } from "react";
import doctorContext from './doctorContext'

const AppointmentState = (props) => {
    const host = 'http://127.0.0.1:5000/';
    const appointmentsIntial = [];
    const prescriptionsIntial = [];

    const [appointments, setAppointments] = useState(appointmentsIntial);
    const [prescriptions, setPrescriptions] = useState(prescriptionsIntial);

    //Get all appointments
    const getAppointments = async (id)=>{
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

    //Take an appointment : Takes an json object appt
    const takeAppointment = async (appt)=>{
       console.log("Adding a new Note")

       const url = `${host}api/appointments/takeappointment`;
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify(appt)
        });

        const appointment = await response.json();
        setAppointments(appointments.concat(appointment));
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
        getAppointments();
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
        getAppointments();
    }

    const getPrescriptions = async (id)=>{
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


    return (
        <patientContext.Provider value={{ appointments, getAppointments,takeAppointment,cancelAppointment,deleteAppointment,getPrescriptions }}>
            {props.children}
        </patientContext.Provider>
    )
}

export default AppointmentState;