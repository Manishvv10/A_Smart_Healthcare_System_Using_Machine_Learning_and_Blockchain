import './App.css';
import React, { useState } from 'react';
import PatientDashboard from './components/patient/PatientDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientLoginForm from './components/patient/PatientLoginForm';
import HomePage from './components/HomePage';
import DoctorLoginForm from './components/doctor/DoctorLoginForm';
import ReceptionistLoginForm from './components/receptionist/ReceptionistLoginForm';
import BookAppointment from './components/patient/BookAppointment';
import PatientState from './context/patient/PatientState';
import DoctorState from './context/doctor/DoctorState';
import ReceptionState from './context/reception/ReceptionState';
import Prescriptions from './components/patient/Prescriptions';
import PrescriptionHtmlPdf from './components/patient/PrescriptionHtmlPdf';
import EmergencyCase from './components/patient/EmergencyCase';
import PatientSignUpForm from './components/patient/PatientSignUpForm';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import DoctorPrescriptionForm from './components/doctor/DoctorPrescriptionForm';
import ReceptionistDashboard from './components/receptionist/ReceptionistDashboard';
import EmergencyAdmForm from './components/emergency/EmergencyAdmForm';
import DoctorPatientDocs from './components/doctor/DoctorPatientDocs';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <PatientState>
      <DoctorState>
        <ReceptionState>
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route exact path='/' element={<HomePage />} />
                {/* Patient Routes */}
                <Route exact path='/patient' element={<PatientDashboard showAlert={showAlert} />} />
                <Route exact path='/patientsignup' element={<PatientSignUpForm alert={alert} showAlert={showAlert} />} />
                <Route exact path='/patientlogin' element={<PatientLoginForm alert={alert} showAlert={showAlert} />} />
                <Route exact path='/patient/bookapt' element={<BookAppointment />} />
                <Route exact path='/patient/prescriptions' element={<Prescriptions />} />
                <Route exact path='/patient/prescriptionsPdf/:id' element={<PrescriptionHtmlPdf />} />
                <Route exact path='/patient/emergencycases' element={<EmergencyCase />} />
                {/* Doctor Routes */}
                <Route exact path='/doctor' element={<DoctorDashboard alert={alert} showAlert={showAlert} />} />
                <Route exact path='/doctorlogin' element={<DoctorLoginForm alert={alert} showAlert={showAlert} />} />
                <Route exact path='/doctor/prescribe/:id' element={<DoctorPrescriptionForm />} />
                <Route exact path='/doctor/prescribe/viewpatientdocs/:id' element={<DoctorPatientDocs />} />
                {/* Receptionist Routes */}
                <Route exact path='/receptionist' element={<ReceptionistDashboard alert={alert} showAlert={showAlert} />} />
                <Route exact path='/receptionistlogin' element={<ReceptionistLoginForm alert={alert} showAlert={showAlert} />} />
                {/* Emergency Routes */}
                <Route exact path='/emergencyregistration' element={<EmergencyAdmForm alert={alert} showAlert={showAlert} />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ReceptionState>
      </DoctorState>
    </PatientState>
  );
}

export default App;
