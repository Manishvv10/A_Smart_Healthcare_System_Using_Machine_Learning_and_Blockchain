import React, { useState,useEffect,useContext } from 'react'
import NavbarTop from '../NavbarTop'
import PEntryDashboard from './PEntryDashboard'
import BookAppointment from './BookAppointment'
import PatientNavbarSide from './PatientNavbarSide'
import AppointmentHistory from './AppointmentHistory'
import Prescriptions from './Prescriptions'
import EmergencyCase from './EmergencyCase'
import MedicalTest from './MedicalTest'
import PatientDocsReports from './PatientDocsReports'
import patientContext from '../../context/patient/patientContext'

const PatientDashboard = () => {

    const [activeComponent, setActiveComponent] = useState('');
    const handleComponentChange = (componentNumber) => {
        setActiveComponent(componentNumber);
    }

    
    const patientcontext = useContext(patientContext);
    const { patientDetails, getpatientdetails } = patientcontext;
    useEffect(() => {
        getpatientdetails();
        // eslint-disable-next-line
    }, [])
    
    return (
        <>
            <NavbarTop />
            <PatientNavbarSide handleComponentChange={handleComponentChange} />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {activeComponent === '' && <PEntryDashboard handleComponentChange={handleComponentChange}/>}
                {activeComponent === 'pentrydashboard' && <PEntryDashboard handleComponentChange={handleComponentChange} />}
                {activeComponent === 'bookappointment' && <BookAppointment />}
                {activeComponent === 'appointmenthistory' && <AppointmentHistory />}
                {activeComponent === 'prescriptions' && <Prescriptions />}
                {activeComponent === 'myemergencycases' && <EmergencyCase />}
                {activeComponent === 'medicaltest' && <MedicalTest patientDetails={patientDetails}/>}
                {activeComponent === 'mydocsreports' && <PatientDocsReports patientDetails={patientDetails}/>}
            </main>

        </>
    )
}

export default PatientDashboard