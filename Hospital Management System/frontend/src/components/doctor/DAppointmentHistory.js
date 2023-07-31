import React,{useEffect,useContext} from 'react'
import doctorContext from "../../context/doctor/doctorContext";
import { useNavigate } from 'react-router-dom';

const DAppointmentHistory = () => {
  let navigate = useNavigate();
  const doctorcontext = useContext(doctorContext);
  const {appointments,fetchalldocappointments,cancelAppointmentDoctor} = doctorcontext;

  useEffect(() => {
    fetchalldocappointments();
      // eslint-disable-next-line
  }, [])

  const prescribe = (id) =>{
    // navigate(`/doctor/prescribe/${id}`);
    window.open(`/doctor/prescribe/${id}`);
  }

  return (
    <div className='container-fluid d-flex my-3 col-md-14 float-left' style={{position:'relative',left:'-33px'}}>
            <div>
                <h2 className='text-center my-2'>Your Appointment History</h2>
                <div className="table-responsive">
                    <table className="table table-hover table-striped" >
                        <thead>
                            <tr>
                                <th scope="col">Appointment ID</th>
                                <th scope="col">Patient ID</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile No.</th>
                                <th scope="col">Appointment Date</th>
                                <th scope="col">Appointment Time</th>
                                <th scope="col">Current Status</th>
                                <th scope="col">Action</th>
                                <th scope="col">Prescribe</th>
                            </tr>
                        </thead>
                        <tbody>
                            { appointments && appointments.map((appointment)=>{
                            return (<tr key={appointment._id}>
                                <td>{appointment._id}</td>
                                <td>{appointment.patient}</td>
                                <td>{appointment.patientfname + " " + appointment.patientlname}</td>
                                <td>{appointment.patientGender}</td>
                                <td>{appointment.patientEmail}</td>
                                <td>{appointment.mobileno}</td>
                                <td>{new Date(appointment.appointmentDate).toDateString()}</td>
                                <td>{new Date(appointment.appointmentTime).toLocaleTimeString()}</td>
                                <td>{appointment.userAppointmentStatus && appointment.doctorAppointmentStatus ? "Active" : appointment.userAppointmentStatus ? "Cancelled by doctor" : "Cancelled by You"}</td>
                                <td><button className="btn btn-danger btn-sm" id='cancelBtn' onClick={()=>{cancelAppointmentDoctor(appointment._id);alert("Appointment Cancelled Successfully!");}} disabled={!(appointment.userAppointmentStatus && appointment.doctorAppointmentStatus)}>Cancel Appointment</button></td>
                                <td><button className="btn btn-success btn-sm" id='prescribeBtn' onClick={()=>{prescribe(appointment._id);}} disabled={!(appointment.userAppointmentStatus && appointment.doctorAppointmentStatus)}>Prescribe</button></td>
                            </tr>)
                            })}
                            
                        </tbody>
                    </table>
                </div></div>
        </div>
  )
}

export default DAppointmentHistory