import React, { useState } from "react";
import doctorContext from './doctorContext';

const DoctorState = (props) => {
    const host = 'http://127.0.0.1:5000/';
    const emergencyCasesIntial = [];
    const appointmentsIntial = [];
    const prescriptionsIntial = [];

    const [appointments, setAppointments] = useState(appointmentsIntial);
    const [appointmentbyid, setAppointmentbyid] = useState(null);
    const [prescriptions, setPrescriptions] = useState(prescriptionsIntial);
    const [emergencyCases, setEmergencyCases] = useState(emergencyCasesIntial);

    //Get all Doctor appointments
    const fetchalldocappointments = async (id)=>{
        //API call
        const url = `${host}api/appointments/fetchalldocappointments`;
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

    const fetchalldocappointmentbyid = async (id)=>{
        //API call
        const url = `${host}api/appointments/fetchappointmentbyid/${id}`;
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setAppointmentbyid(json);
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
        fetchalldocappointments();
    }

    //Cancel an Appointment : set userAppointmentStatus to false
    const cancelAppointmentDoctor = async (id)=>{
        // API Call
        const url = `${host}api/appointments/cancelAppointmentdoctor/${id}`;
        const response = await fetch(url,{
            method:'PUT',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
        });

        const json = await response.json();
        console.log(json);
        fetchalldocappointments();
    }
    
    const fetchalldocprescriptions = async (id)=>{
        //API call
        const url = `${host}api/prescription/fetchalldocprescriptions`;
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
    
    const fetchalldoctoremergency = async ()=>{
        //API call
        const url = `${host}api/emergency/fetchalldoctoremergency`;
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

    const submitPrescription = async (id,docPrescription)=>{
        //API call
        const url = `${host}api/prescription/newprescription/${id}`;
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-type':"application/json",
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify(docPrescription)
        });
        const json = await response.json();
        setPrescriptions(prescriptions.concat(json));
    }


    return (
        <doctorContext.Provider value={{ appointments,prescriptions,emergencyCases,appointmentbyid,fetchalldocprescriptions, fetchalldocappointments,cancelAppointmentDoctor,deleteAppointment,submitPrescription,fetchalldoctoremergency,fetchalldocappointmentbyid}}>
            {props.children}
        </doctorContext.Provider>
    )
}

export default DoctorState;