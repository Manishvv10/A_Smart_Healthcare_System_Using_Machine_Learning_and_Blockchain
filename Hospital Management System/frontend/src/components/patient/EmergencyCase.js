import React, { useEffect, useContext } from 'react';
import patientContext from '../../context/patient/patientContext';

const EmergencyCase = () => {

  const patientcontext = useContext(patientContext)
  const { emergencyCases, fetchallpatientemergency, } = patientcontext;

  useEffect(() => {
    fetchallpatientemergency();
    // eslint-disable-next-line
  }, [])
  return (
    <div className='container my-3'>
      <div>
        <h2 className='text-center'>Your Emergency Cases History</h2>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Emergency Case ID</th>
                <th scope="col">Patient ID</th>
                <th scope="col">Patient Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">Age</th>
                <th scope="col">Address</th>
                <th scope="col">Casualty Description</th>
                <th scope="col">Casualty Level</th>
                <th scope="col">Date of Casualty</th>
              </tr>
            </thead>
            <tbody>
              {emergencyCases && emergencyCases.map((emergencyCase) => {
                return (<tr key={emergencyCase._id}>
                  <td>{emergencyCase._id}</td>
                  <td>{emergencyCase.patient}</td>
                  <td>{emergencyCase.fname + " " + emergencyCase.lname}</td>
                  <td>{emergencyCase.email}</td>
                  <td>{emergencyCase.mobileno}</td>
                  <td>{emergencyCase.age}</td>
                  <td>{emergencyCase.address}</td>
                  <td>{emergencyCase.casualtyDescription}</td>
                  <td>{emergencyCase.casualtyLevel}</td>
                  <td>{new Date(emergencyCase.casualtyRegDate).toDateString()}</td>
                </tr>)
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EmergencyCase