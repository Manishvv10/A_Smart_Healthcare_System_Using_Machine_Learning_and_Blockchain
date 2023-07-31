import React, { useEffect, useContext } from 'react';
import receptionContext from '../../context/reception/receptionContext';

const RAllDoctors = () => {

  const receptioncontext = useContext(receptionContext);
  const { doctors, getalldoctors } = receptioncontext;

  useEffect(() => {
    getalldoctors();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container my-3'>
      <div>
        <h2 className='text-center'>Registered Doctors</h2>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Doctor ID</th>
                <th scope="col">Doctor Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile No.</th>
                <th scope="col">Age</th>
                <th scope="col">Speciality</th>
                <th scope="col">Qualification </th>
                <th scope="col">Experience </th>
              </tr>
            </thead>
            <tbody>
              {doctors && doctors.map((doctor) => {
                return (<tr key={doctor._id}>
                  <td>{doctor._id}</td>
                  <td>{doctor.fname + " " + doctor.lname}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.mobileno}</td>
                  <td>{doctor.age}</td>
                  <td>{doctor.speciality}</td>
                  <td>{doctor.qualification}</td>
                  <td>{doctor.experience}</td>
                </tr>)
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RAllDoctors