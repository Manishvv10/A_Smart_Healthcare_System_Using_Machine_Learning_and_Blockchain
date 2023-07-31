import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PrescriptionHtmlPdf = (props) => {

    const host = "http://127.0.0.1:5000/"
    const [singlePrescription, setSinglePrescription] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchaprescriptionbyid(id);
        // eslint-disable-next-line
    }, [])

    const fetchaprescriptionbyid = async (id) => {
        //API call
        const url = `${host}api/prescription/fetchaprescriptionbyid`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ id })
        });
        const json = await response.json();
        setSinglePrescription(json);
    }

    const generatePDF = () => {
        window.print();
    };

    return (
        <>
            {singlePrescription && <div className="container-fluid my-3 justify-content-center align-items-center col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-center mb-3">Global Hospitals,Pune</h1>
                        <h5 className="text-center mb-5">Prescription Slip</h5>
                        <div className="row my-3">
                            <div className="col">
                                <h6 className="card-text">Appointment id:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.appointment}</p>
                            </div>
                            <div className="col">
                                <h6 className="card-text">Dated:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{new Date(singlePrescription.appointmentDate).toDateString() + " " + new Date(singlePrescription.appointmentTime).toLocaleTimeString()}</p>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col">
                                <h6 className="card-text">Patient id:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.patient}</p>
                            </div>
                            <div className="col">
                                <h6 className="card-text">Patient's Name:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.patientfname + " " + singlePrescription.patientlname}</p>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col">
                                <h6 className="card-text">Doctor's Id:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.doctor}</p>
                            </div>
                            <div className="col">
                                <h6 className="card-text">Doctor's Name:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.doctorfname + " " + singlePrescription.doctorlname}</p>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col">
                                <h6 className="card-text">Patient Contact No.:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.mobileno}</p>
                            </div>
                            <div className="col">
                                <h6 className="card-text">Patient's Email:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.patientEmail}</p>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col">
                                <h6 className="card-text">Referred To:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.referredTo}</p>
                            </div>
                            <div className="col">
                                <p className="card-text"></p>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col">
                                <h6 className="card-text">Disease:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.disease}</p>
                            </div>
                            <div className="col">
                                <h6 className="card-text">Allergy:</h6>
                            </div>
                            <div className="col col-md-4">
                                <p className="card-text">{singlePrescription.allergy}</p>
                            </div>
                        </div>
                        <div className="row my-5">
                            <div className="col">
                                <h5 className="card-text">Prescription:</h5>
                                <p className="card-text my-4">{singlePrescription.doctorPrescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center my-5">
                        <button className="btn btn-dark text-center" onClick={generatePDF}>Print</button>
                </div>
            </div>
            }


        </>
    );
};

export default PrescriptionHtmlPdf;
