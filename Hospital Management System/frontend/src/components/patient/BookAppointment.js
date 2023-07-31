import React, { useState, useEffect,useContext } from 'react';
// import doctorContext from '../../context/doctor/doctorContext';
import patientContext from '../../context/patient/patientContext';

const BookAppointment = () => {

    const host = "http://127.0.0.1:5000/";
    const patientcontext = useContext(patientContext);
    const {takeAppointment} = patientcontext;

    const [specialization, setSpecialization] = useState('');
    const [doctorNamesArr, setDoctorNamesArr] = useState(0);
    const [docNameId, setdocNameId] = useState('');
    const [docFees, setDocFees] = useState(0);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSelectChange = (event) => {
        setSpecialization(event.target.value);
    }

    useEffect(() => {
        fetchdoctorNamesArr(specialization);
        // eslint-disable-next-line
    }, [specialization])

    useEffect(() => {
        getDocFees();
        // eslint-disable-next-line
    }, [docNameId])

    const getDocFees = async () => {
        const url = `${host}api/auth/doctor/getdoctorfees`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ docid: docNameId })
        });

        const json = await response.json();
        setDocFees(json.fees);
    }
    const handleDocNameChange = (event) => {
        setdocNameId(event.target.value)
        console.log(doctorNamesArr.find(doc => doc._id.toString() === docNameId.toString()));
        // getDocFees();
    }

    const handleDocFeesChange = (event) => {
        setDocFees(event.target.value);
    }
    const handleDateChange = (event) => {
        setDate(event.target.value);
    }
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }

    const fetchdoctorNamesArr = async () => {
        const url = `${host}api/auth/doctor/getdoctordetailsbyspecialization`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ speciality: specialization })
        });

        const json = await response.json();
        setDoctorNamesArr(json);
    }

    // const handleCreateAppointment=async()=>{
    //     const url = `${host}api/appointments/takeappointment`;
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': "application/json",
    //             'auth-token': localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({ appointmentDate:new Date(date),appointmentTime:new Date(date+" "+time),doctorId:docNameId })
    //     });
    //     const json = await response.json();
    //     console.log(json);
    // }

    


    return (
        <>
            <div className="container-fluid d-flex my-5 justify-content-center align-items-center">
                <div className="card col-md-10">
                    <div className="card-body text-center">
                        <h2 className='text-center mb-4'>Take an Appointment</h2>
                        <div className="row">
                            {/* 1st Field :Specialization */}
                            <div className="col-md-3 text-center justify-content-center align-items-center my-3">
                                <label htmlFor="specialization"><h6>Specialization:</h6></label>
                            </div>
                            <div className="col-md-8 my-3">
                                <select className="form-select" aria-label="Default select example" name='specialization' value={specialization} onChange={handleSelectChange}>
                                    <option defaultValue={"Open this select menu"}>Open this select menu</option>
                                    <option value="EYE">EYE</option>
                                    <option value="SKIN">SKIN</option>
                                    <option value="ENT">ENT</option>
                                </select>
                            </div>
                            {/* 2nd Field : Doctor Name */}
                            <div className="col-md-3 text-center justify-content-center align-items-center my-3">
                                <label htmlFor="specialization"><h6>Doctor Name:</h6></label>
                            </div>
                            <div className="col-md-8 my-3">
                                {doctorNamesArr && <select className="form-select" aria-label="Default select example" name='specialization' value={docNameId} onChange={handleDocNameChange}>
                                    <option defaultValue={"Open this select menu"}>Open this select menu</option>
                                    {doctorNamesArr.map((option, index) => (
                                        <option key={index} value={option._id}>
                                            {option.fname + " " + option.lname}
                                        </option>
                                    ))}
                                </select>
                                }
                            </div>
                            {/* 3rd Field : Consultancy Fees */}
                            <div className="col-md-3 text-center justify-content-center align-items-center my-3">
                                <label htmlFor="specialization"><h6>Doctor's Consultancy Fees:</h6></label>
                            </div>
                            <div className="col-md-8 my-3">
                                {doctorNamesArr && <select className="form-select" aria-label="Default select example" name='specialization' value={docFees} onChange={handleDocFeesChange} disabled>
                                    <option defaultValue={docFees}>{docFees}</option>
                                </select>
                                }
                            </div>
                            {/* 4th Field : Appointment Date */}
                            <div className="col-md-3 text-center justify-content-center align-items-center my-3">
                                <label htmlFor="specialization"><h6>Appointment Date:</h6></label>
                            </div>
                            <div className="col-md-8 my-3">
                                <div className="col-md-12">
                                    <input type="date" className="form-control datepicker" name="appdate" id='appdate' value={date} min={Date.now()} onChange={handleDateChange} />
                                </div>

                            </div>
                            {/* 5th Field : Appointment Time */}
                            <div className="col-md-3 text-center justify-content-center align-items-center my-3">
                                <label htmlFor="specialization"><h6>Appointment Time:</h6></label>
                            </div>
                            <div className="col-md-8 my-3">
                                <div className="col-md-12">
                                    <input type="time" className="form-control datepicker" name="apptime" id='apptime' value={time} onChange={handleTimeChange}/>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-dark mt-4" onClick={()=>{takeAppointment(date,time,docNameId,specialization);alert("Appointment Booked Successfully!");}}>Book Appointment</button>
                        {/* <button className="btn btn-primary mt-4" onClick={handleCreateAppointment}>Book Appointment</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookAppointment