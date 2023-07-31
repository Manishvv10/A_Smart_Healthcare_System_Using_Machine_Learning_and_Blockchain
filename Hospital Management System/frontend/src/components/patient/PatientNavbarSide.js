import React from 'react'

const PatientNavbarSide = (props) => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/" onClick={(e) =>{e.preventDefault(); props.handleComponentChange('pentrydashboard')}}>
                            <span data-feather="home"></span>
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => {e.preventDefault(); props.handleComponentChange('bookappointment')}}>
                            <span data-feather="file"></span>
                            Book Appointment
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => {e.preventDefault(); props.handleComponentChange('appointmenthistory')}}>
                            <span data-feather="shopping-cart"></span>
                            Appointment History
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => {e.preventDefault(); props.handleComponentChange('prescriptions')}}>
                            <span data-feather="users"></span>
                            Prescriptions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => {e.preventDefault(); props.handleComponentChange('mydocsreports')}}>
                            <span data-feather="bar-chart-2"></span>
                            My Documents & Reports
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={(e) => {e.preventDefault(); props.handleComponentChange('medicaltest')}}>
                            <span data-feather="layers"></span>
                            Medical Test
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
                        <a className="nav-link" href="/" onClick={(e) => {e.preventDefault(); props.handleComponentChange('myemergencycases')}}>
                            <span data-feather="file-text"></span>
                            My Emergency Cases
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default PatientNavbarSide