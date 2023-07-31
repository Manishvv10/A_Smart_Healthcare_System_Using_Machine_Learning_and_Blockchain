import React,{useEffect,useContext} from 'react';
import doctorContext from '../../context/doctor/doctorContext'

const DPrescriptions = () => {
  const doctorcontext = useContext(doctorContext);
  const { prescriptions, fetchalldocprescriptions } = doctorcontext;

  useEffect(() => {
    fetchalldocprescriptions();
    // eslint-disable-next-line
}, [])

  return (
    <div className='container my-3'>
      <div>
        <h2 className='text-center'>Your Given Prescriptions</h2>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Prescription ID</th>
                <th scope="col">Appointment ID</th>
                <th scope="col">Patient ID</th>
                <th scope="col">Patient Name</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Appointment Time</th>
                <th scope="col">Diseases</th>
                <th scope="col">Allergy</th>
                <th scope="col">Prescription</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions && prescriptions.map((prescription) => {
                return (<tr key={prescription._id}>
                  <td>{prescription._id}</td>
                  <td>{prescription.appointment}</td>
                  <td>{prescription.patient}</td>
                  <td>{prescription.patientfname + " " + prescription.patientlname}</td>
                  <td>{new Date(prescription.appointmentDate).toDateString()}</td>
                  <td>{new Date(prescription.appointmentTime).toLocaleTimeString()}</td>
                  <td>{prescription.disease}</td>
                  <td>{prescription.allergy}</td>
                  <td>{prescription.doctorPrescription}</td>
                </tr>)
              })}

            </tbody>
          </table>
        </div></div>
    </div>
  )
}

export default DPrescriptions