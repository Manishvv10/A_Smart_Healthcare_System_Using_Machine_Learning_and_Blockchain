import React,{useEffect,useContext} from 'react'
import receptionContext from '../../context/reception/receptionContext';

const RAllPatients = () => {
  const receptioncontext = useContext(receptionContext);
  const { patients, getallpatients } = receptioncontext;

  useEffect(() => {
    getallpatients();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container my-3'>
      <div>
        <h2 className='text-center'>Registered Patients</h2>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Patirnt ID</th>
                <th scope="col">Patient Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile No.</th>
                <th scope="col">Age</th>
                <th scope="col">Registered Since</th>
                <th scope="col">Address </th>
              </tr>
            </thead>
            <tbody>
              {patients && patients.map((patient) => {
                return (<tr key={patient._id}>
                  <td>{patient._id}</td>
                  <td>{patient.fname + " " + patient.lname}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.email}</td>
                  <td>{patient.mobileno}</td>
                  <td>{patient.age}</td>
                  <td>{patient.registrationdate}</td>
                  <td>{patient.address}</td>
                </tr>)
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RAllPatients