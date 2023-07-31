import React from 'react'

const ReceptionistNavbarSide = (props) => {
  return (
    <nav id="sidebarMenu" className="col-md-5 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/" onClick={(e) => { e.preventDefault(); props.handleComponentChange('REntrydashboard') }}>
                            <span data-feather="home"></span>
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => { e.preventDefault(); props.handleComponentChange('registerPatient') }}>
                            <span data-feather="file"></span>
                            Register a Patient
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => { e.preventDefault(); props.handleComponentChange('allregisteredPatients') }}>
                            <span data-feather="file"></span>
                            View Registered Patients
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => { e.preventDefault(); props.handleComponentChange('allregisteredDoctors') }}>
                            <span data-feather="users"></span>
                            View Registered Doctors
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => { e.preventDefault(); props.handleComponentChange('allAppointments') }}>
                            <span data-feather="users"></span>
                            View All Appointments
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => { e.preventDefault(); props.handleComponentChange('registerNewDoctor') }}>
                            <span data-feather="users"></span>
                            Register A New Doctor
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => { e.preventDefault(); props.handleComponentChange('deregisterDoctor') }}>
                            <span data-feather="users"></span>
                            Deregister Doctor
                        </a>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Emergency / Trauma Cases</span>
                    <a className="link-secondary" href="/" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => { e.preventDefault(); props.handleComponentChange('allEmergencyCases') }}>
                            <span data-feather="file-text"></span>
                            View Emergency Cases
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
  )
}

export default ReceptionistNavbarSide