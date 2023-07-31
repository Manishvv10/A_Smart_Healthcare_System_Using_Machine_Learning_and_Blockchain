import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem('digilocker-token');
        navigate("/");
    }

    return (
        <>
        {localStorage.getItem('digilocker-token')?
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/userdashboard">DigiLocker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/upload" ? "active" : ""}`} aria-current="page" to="/upload">Upload Documents</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/viewdocs" ? "active" : ""}`} to="/viewdocs">View Documents</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('digilocker-token')?<form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/register" role="button">Sign Up</Link>
                        </form>: <button onClick={handleLogout} className="btn btn-primary mx-2" to="/login">Logout</button>
}
                    </div>
                </div>
            </nav>
        :""}
        </>
    )
}

export default Navbar