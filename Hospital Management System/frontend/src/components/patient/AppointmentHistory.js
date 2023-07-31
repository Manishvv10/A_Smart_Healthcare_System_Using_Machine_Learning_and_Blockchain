import React,{useEffect,useContext} from 'react';
import patientContext from '../../context/patient/patientContext';

const AppointmentHistory = () => {
    // const host = "http://127.0.0.1:5000/";
    // const [appointments, setAppointments] = useState(null);
    const patientcontext = useContext(patientContext)
    const {appointments,fetchallappointments,cancelAppointment} = patientcontext;

    useEffect(() => {
        fetchallappointments();
        // eslint-disable-next-line
    }, [])
    

    return (
        <div className='container my-3'>
            <div>
                <h2 className='text-center'>Your Appointment History</h2>
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Appointment ID</th>
                                <th scope="col">Doctor Name</th>
                                <th scope="col">Consultancy Fees</th>
                                <th scope="col">Appointment Date</th>
                                <th scope="col">Appointment Time</th>
                                <th scope="col">Current Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { appointments && appointments.map((appointment)=>{
                            return (<tr key={appointment._id}>
                                <td>{appointment._id}</td>
                                <td>{appointment.doctorfname + " " + appointment.doctorlname}</td>
                                <td>{appointment.doctorFees}</td>
                                <td>{new Date(appointment.appointmentDate).toDateString()}</td>
                                <td>{new Date(appointment.appointmentTime).toLocaleTimeString()}</td>
                                <td>{appointment.userAppointmentStatus && appointment.doctorAppointmentStatus ? "Active" : appointment.userAppointmentStatus ? "Cancelled by doctor" : "Cancelled by You"}</td>
                                <td><button className="btn btn-danger btn-sm" id='cancelBtn' onClick={()=>{
                                    cancelAppointment(appointment._id);
                                    alert("Appointment Cancelled Successfully!");
                                    }} disabled={!(appointment.userAppointmentStatus && appointment.doctorAppointmentStatus)}>Cancel Appointment</button></td>
                            </tr>)
                            })}
                            
                        </tbody>
                    </table>
                </div></div>
        </div>
    )
}

export default AppointmentHistory