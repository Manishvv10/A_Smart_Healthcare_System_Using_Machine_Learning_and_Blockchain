import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import doctorContext from '../../context/doctor/doctorContext';


const DoctorPrescriptionForm = () => {

    let navigate = useNavigate();

    let doctorcontext = useContext(doctorContext);
    const { submitPrescription } = doctorcontext;
    const [docPrescription, setDocPrescription] = useState({
        disease: "",
        allergy: "",
        doctorPrescription: ""
    });

    const onChange = (e) => {
        setDocPrescription({ ...docPrescription, [e.target.name]: e.target.value });
    }
    const handleExit = () => {
        // navigate('/doctor');
        window.close();
    }
    const { id } = useParams();
    // document.body.style.backgroundColor = '#f5f5f5';
    document.body.style.background = '-webkit-linear-gradient(left, #3931af, #00c6ff)';

    const handleDocsReports = () =>{
        // navigate(`/doctor/prescribe/viewpatientdocs/${id}`);
        window.open(`/doctor/prescribe/viewpatientdocs/${id}`, '_blank');
      }

    return (
        <>
            <div className="container-fluid d-flex my-5 justify-content-center align-items-center">
                <div className="card col-md-10" style={{ backgroundColor: '#f5f5f5' }}>
                    <div className="card-body text-center">
                        <h2 className='text-center mb-4'>Prescription Form</h2>
                        <div className="row">
                            {/* 1st Field :Disease */}
                            <div className="col-md-3 text-center justify-content-center align-items-center my-3">
                                <label htmlFor="specialization"><h6>Disease:</h6></label>
                            </div>
                            <div className="col-md-8 my-3">
                                <div className="mb-3">
                                    <textarea className="form-control" id="disease" name="disease" rows="5" placeholder='Disease diagnosed' onChange={onChange} ></textarea>
                                </div>
                            </div>
                            {/* 2nd Field :Allergy */}
                            <div className="col-md-3 text-center justify-content-center align-items-center my-3">
                                <label htmlFor="specialization"><h6>Allergy:</h6></label>
                            </div>
                            <div className="col-md-8 my-3">
                                <div className="mb-3">
                                    <textarea className="form-control" id="allergy" name="allergy" rows="5" placeholder='Allergies (If any)' onChange={onChange}></textarea>
                                </div>
                            </div>
                            {/* 3rd Field :Prescription */}
                            <div className="col-md-3 text-center justify-content-center align-items-center my-3">
                                <label htmlFor="specialization"><h6>Disease:</h6></label>
                            </div>
                            <div className="col-md-8 my-3">
                                <div className="mb-3">
                                    <textarea className="form-control" id="doctorPrescription" name="doctorPrescription" rows="5" placeholder='Prescription' onChange={onChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-dark mt-2 mb-2 mx-3" onClick={() => { submitPrescription(id, docPrescription); alert("Prescription registered Successfully!");; }}>Prescribe Patient </button>
                        <button className="btn btn-dark mt-2 mb-2 mx-3" onClick={handleExit}>Go Back </button>
                        <button className="btn btn-dark mt-2 mb-2 mx-3" onClick={handleDocsReports}>Get Patient Documents & Reports </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorPrescriptionForm