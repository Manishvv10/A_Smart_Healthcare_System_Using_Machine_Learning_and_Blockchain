import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavbarTop = () => {
    let navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <header className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/patient">Global Hospitals</Link>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search"/>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" href="/" onClick={handleLogout}>Sign out</a>
                    </div>
                </div>
        </header>
    )
}

export default NavbarTop