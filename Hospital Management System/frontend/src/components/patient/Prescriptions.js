import React, { useEffect, useContext } from 'react';
import patientContext from '../../context/patient/patientContext';
import { useNavigate } from 'react-router-dom';

const Prescriptions = () => {
    let navigate = useNavigate();

    const patientcontext = useContext(patientContext);
    const { prescriptions, fetchallprescriptions } = patientcontext;

    useEffect(() => {
        fetchallprescriptions();
        // eslint-disable-next-line
    }, [])

    const generatePDF = (id) => {
        // Define the content and layout of the PDF
        // const encodedData = encodeURIComponent(JSON.stringify(prescriptions));
        // navigate(`/patient/prescriptionsPdf?data=${encodedData}`);
        navigate(`/patient/prescriptionsPdf/${id}`);
      };

    return (
        <div className='container my-3'>
            <div>
                <h2 className='text-center'>Your Prescriptions</h2>
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Appointment ID</th>
                                <th scope="col">Doctor Name</th>
                                <th scope="col">Appointment Date</th>
                                <th scope="col">Appointment Time</th>
                                <th scope="col">Diseases</th>
                                <th scope="col">Allergy</th>
                                <th scope="col">Prescription</th>
                                <th scope="col">Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions && prescriptions.map((prescription) => {
                                return (<tr key={prescription._id}>
                                    <td>{prescription._id}</td>
                                    <td>{prescription.doctorfname + " " + prescription.doctorlname}</td>
                                    <td>{new Date(prescription.appointmentDate).toDateString()}</td>
                                    <td>{new Date(prescription.appointmentTime).toLocaleTimeString()}</td>
                                    <td>{prescription.disease}</td>
                                    <td>{prescription.allergy}</td>
                                    <td>{prescription.doctorPrescription}</td>
                                    <td><button className="btn btn-success btn-sm" id='downloadPresBtn' onClick={()=>{generatePDF(prescription._id)}}>Download Prescription</button></td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div></div>
        </div>
        )
}

export default Prescriptions