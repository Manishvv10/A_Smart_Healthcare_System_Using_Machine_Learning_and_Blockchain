import React, { useEffect, useContext } from 'react'
import receptionContext from '../../context/reception/receptionContext';

const RAllAppointments = () => {
    const receptioncontext = useContext(receptionContext);
    const { appointments, getallappointments } = receptioncontext;

    useEffect(() => {
        getallappointments();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container-fluid d-flex my-3 col-md-20' style={{position:'relative',left:'-33px'}}>
            <div>
                <h2 className='text-center'>Appointments</h2>
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Appointment ID</th>
                                <th scope="col">Patient ID</th>
                                <th scope="col">Doctor ID</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Doctor Name</th>
                                <th scope="col">Patient Email</th>
                                <th scope="col">Patient Mobile No.</th>
                                <th scope="col">Appointment Date & Time </th>
                                <th scope="col">Referred To</th>
                                <th scope="col">Appointment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && appointments.map((appointment) => {
                                return (<tr key={appointment._id}>
                                    <td>{appointment._id}</td>
                                    <td>{appointment.patient}</td>
                                    <td>{appointment.doctor}</td>
                                    <td>{appointment.patientfname + " " + appointment.patientlname}</td>
                                    <td>{appointment.doctorfname + " " + appointment.doctorlname}</td>
                                    <td>{appointment.patientEmail}</td>
                                    <td>{appointment.mobileno}</td>
                                    <td>{new Date(appointment.appointmentDate).toDateString() + new Date(appointment.appointmentTime).toLocaleTimeString()}</td>
                                    <td>{appointment.referredTo}</td>
                                    <td>{appointment.userAppointmentStatus && appointment.doctorAppointmentStatus?"Active":appointment.userAppointmentStatus?"Cancelled By Doctor":"Cancelled By Patient"}</td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RAllAppointments