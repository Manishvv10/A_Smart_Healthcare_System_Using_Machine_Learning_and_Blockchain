import React from 'react';
// import patientContext from "../../context/patient/patientContext";


const PEntryDashboard = (props) => {
    // const host = "http://127.0.0.1:5000/"
    // const [patientData, setPatientData] = useState(null);

    // useEffect(() => {
    //     getPatientData();
    //     console.log(patientData);
    //     // eslint-disable-next-line
    // }, [])

    // const getPatientData = async () => {
    //     //API call
    //     const url = `${host}api/auth/patient/getpatient`;
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': "application/json",
    //             'auth-token': localStorage.getItem('token')
    //         },
    //     });
    //     const json = await response.json();
    //     console.log(json);
    // }

    return (
        <>
            <div className="container text-center mt-5">
                <h1 className='text-center mb-5'>Welcome , </h1>
                <div className="tab-pane fade  show active" id="list-dash" role="tabpanel" aria-labelledby="list-dash-list">
                    <div className="container-fluid container-fullw bg-white">
                        <div className="row">
                            <div className="col-sm-4" style={{ left: "5%" }}>
                                <div className="panel panel-white no-radius text-center">
                                    <div className="panel-body">
                                        <span className="fa-stack fa-2x"> <i className="fa fa-square fa-stack-2x text-primary"></i> <i
                                            className="fa fa-terminal fa-stack-1x fa-inverse"></i> </span>
                                        <h4 className="StepTitle" style={{ marginTop: "5%" }}> Book My Appointment</h4>
                                        <p className="links cl-effect-1">
                                            <a href="#list-home" onClick={(e) =>{e.preventDefault(); props.handleComponentChange('bookappointment')}}>
                                                Book Appointment
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4" style={{ left: "10%" }}>
                                <div className="panel panel-white no-radius text-center">
                                    <div className="panel-body">
                                        <span className="fa-stack fa-2x"> <i className="fa fa-square fa-stack-2x text-primary"></i> <i
                                            className="fa fa-paperclip fa-stack-1x fa-inverse"></i> </span>
                                        <h4 className="StepTitle" style={{ marginTop: "5%" }}>My Appointments</h4>

                                        <p className="cl-effect-1">
                                            <a href="#app-hist" onClick={(e) =>{e.preventDefault(); props.handleComponentChange('appointmenthistory')}}>
                                                View Appointment History
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-sm-4" style={{ left: "10%" }}>
                                <div className="panel panel-white no-radius text-center">
                                    <div className="panel-body">
                                        <span className="fa-stack fa-2x"> <i className="fa fa-square fa-stack-2x text-primary"></i> <i
                                            className="fa fa-paperclip fa-stack-1x fa-inverse"></i> </span>
                                        <h4 className="StepTitle" style={{ marginTop: "5%" }}>My Prescriptions</h4>

                                        <p className="cl-effect-1">
                                            <a href="#app-hist" onClick={(e) =>{e.preventDefault(); props.handleComponentChange('prescriptions')}}>
                                                View Prescription History
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <div className="col-sm-4" style={{ left: "20%", marginTop: "5%" }}>
                                <div className="panel panel-white no-radius text-center">
                                    <div className="panel-body">
                                        <span className="fa-stack fa-2x"> <i className="fa fa-square fa-stack-2x text-primary"></i> <i
                                            className="fa fa-list-ul fa-stack-1x fa-inverse"></i> </span>
                                        <h4 className="StepTitle" style={{ marginTop: "5%" }}>Prescriptions</h4>

                                        <p className="cl-effect-1">
                                           <a href="#app-hist" onClick={(e) =>{e.preventDefault(); props.handleComponentChange('prescriptions')}}>
                                                View Prescription List
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default PEntryDashboard