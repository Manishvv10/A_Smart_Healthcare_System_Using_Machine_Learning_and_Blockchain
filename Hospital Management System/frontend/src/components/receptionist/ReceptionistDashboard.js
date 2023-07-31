import React,{useState} from 'react'
import NavbarTop from '../NavbarTop'
import REntryDashboard from './REntryDashboard'
import ReceptionistNavbarSide from './ReceptionistNavbarSide'
import RAllPatients from './RAllPatients'
import RAllDoctors from './RAllDoctors'
import RAllAppointments from './RAllAppointments'
import RegisterDoctor from './RegisterDoctor'
import DeregisterDoctor from './DeregisterDoctor'
import REmergencyCases from './REmergencyCases'
import RegisterPatient from './RegisterPatient'

const ReceptionistDashboard = (props) => {

    const [activeComponent, setActiveComponent] = useState('');
    const handleComponentChange = (componentNumber) => {
        setActiveComponent(componentNumber);
    }
    return (
        <>
            <NavbarTop />
            <ReceptionistNavbarSide handleComponentChange={handleComponentChange} />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {activeComponent === '' && <REntryDashboard handleComponentChange={handleComponentChange} />}
                {activeComponent === 'REntrydashboard' && <REntryDashboard handleComponentChange={handleComponentChange} />}
                {activeComponent === 'allregisteredPatients' && <RAllPatients />}
                {activeComponent === 'allregisteredDoctors' && <RAllDoctors />}
                {activeComponent === 'allAppointments' && <RAllAppointments />}
                {activeComponent === 'registerNewDoctor' && <RegisterDoctor alert={props.alert} showAlert={props.showAlert}/>}
                {activeComponent === 'deregisterDoctor' && <DeregisterDoctor alert={props.alert} showAlert={props.showAlert}/>}
                {activeComponent === 'allEmergencyCases' && <REmergencyCases alert={props.alert} showAlert={props.showAlert}/>}
                {activeComponent === 'registerPatient' && <RegisterPatient alert={props.alert} showAlert={props.showAlert}/>}
            </main>
        </>
    )
}

export default ReceptionistDashboard