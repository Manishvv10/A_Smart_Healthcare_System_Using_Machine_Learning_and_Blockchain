import React,{useState} from 'react'
import NavbarTop from '../NavbarTop';
import DEntryDashboard from './DEntryDashboard';
import DoctorNavbarSide from './DoctorNavbarSide';
import DAppointmentHistory from './DAppointmentHistory';
import DPrescriptions from './DPrescriptions';
import DocEmergencyCases from './DocEmergencyCases';

const DoctorDashboard = () => {

    const [activeComponent, setActiveComponent] = useState('');
    const handleComponentChange = (componentNumber) => {
        setActiveComponent(componentNumber);
    }

  return (
    <>
        <NavbarTop />
            <DoctorNavbarSide handleComponentChange={handleComponentChange} />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {activeComponent === '' && <DEntryDashboard handleComponentChange={handleComponentChange}/>}
                {activeComponent === 'dEntrydashboard' && <DEntryDashboard handleComponentChange={handleComponentChange} />}
                {activeComponent === 'dAppointmentHistory' && <DAppointmentHistory handleComponentChange={handleComponentChange}/>}
                {activeComponent === 'DPrescriptions' && <DPrescriptions handleComponentChange={handleComponentChange}/>}
                {activeComponent === 'docEmergencyCases' && <DocEmergencyCases />}
            </main>
    </>
  )
}

export default DoctorDashboard