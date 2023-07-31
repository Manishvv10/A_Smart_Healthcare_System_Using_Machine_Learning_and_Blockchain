import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UploadPage from './components/UploadPage';
import ViewDocs from './components/ViewDocs';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';

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
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path='/' element={<Homepage alert={alert} showAlert={showAlert} />} />
          <Route exact path='/login' element={<LoginPage alert={alert} showAlert={showAlert} />} />
          <Route exact path='/register' element={<RegisterPage alert={alert} showAlert={showAlert} />} />
          <Route exact path='/upload' element={<UploadPage alert={alert} showAlert={showAlert} />} />
          <Route exact path='/userdashboard' element={<UploadPage alert={alert} showAlert={showAlert} />} />
          <Route exact path='/viewdocs' element={<ViewDocs alert={alert} showAlert={showAlert} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
