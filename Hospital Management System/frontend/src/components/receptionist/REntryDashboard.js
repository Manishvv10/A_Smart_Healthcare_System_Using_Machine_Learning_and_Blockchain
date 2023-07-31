import React from 'react'

const REntryDashboard = (props) => {
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
                                <h4 className="StepTitle" style={{ marginTop: "5%" }}>View Registered Patients </h4>
                                <p className="links cl-effect-1">
                                    <a href="#list-home" onClick={(e) =>{e.preventDefault(); props.handleComponentChange('allregisteredPatients')}}>
                                    View All Registered Patients
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
                                <h4 className="StepTitle" style={{ marginTop: "5%" }}>View Registered Doctors</h4>

                                <p className="cl-effect-1">
                                    <a href="#app-hist" onClick={(e) =>{e.preventDefault(); props.handleComponentChange('allregisteredDoctors')}}>
                                    View All Registered Doctors
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
                                <h4 className="StepTitle" style={{ marginTop: "5%" }}>View Appointments</h4>

                                <p className="cl-effect-1">
                                    <a href="#app-hist" onClick={(e) =>{e.preventDefault(); props.handleComponentChange('allAppointments')}}>
                                    View All Appointments
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
                                <h4 className="StepTitle" style={{ marginTop: "5%" }}>Register A New Doctor</h4>

                                <p className="cl-effect-1">
                                    <a href="#list-pres"  onClick={(e) =>{e.preventDefault(); props.handleComponentChange('registerNewDoctor')}}>
                                        Register A New Doctor
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
                                <h4 className="StepTitle" style={{ marginTop: "5%" }}>Deregister Doctor</h4>

                                <p className="cl-effect-1">
                                    <a href="#list-pres"  onClick={(e) =>{e.preventDefault(); props.handleComponentChange('deregisterDoctor')}}>
                                    Deregister A Doctor

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
                                <h4 className="StepTitle" style={{ marginTop: "5%" }}>View Emergency Cases</h4>

                                <p className="cl-effect-1">
                                    <a href="#list-pres"  onClick={(e) =>{e.preventDefault(); props.handleComponentChange('allEmergencyCases')}}>
                                    View All Emergency Cases
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

export default REntryDashboard