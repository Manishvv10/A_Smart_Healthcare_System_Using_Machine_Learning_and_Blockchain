import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    let navigate = useNavigate();

    const handleSignIn = ()=>{
        navigate('/login');
    }
    
    const handleSignUp = ()=>{
        navigate('/register');
    }
    return (
        <div className="container text-center" style={{position:'relative',top:'25vh'}}>
            <main className="form-signin">
                <form>
                    <img className="mb-4" src={require('../images/icon.jpg')} alt="" />
                    <h1 className="h3 mb-3 fw-normal">DigiLocker</h1>
                    <button className="btn btn-lg btn-primary my-4 mx-4" onClick={handleSignIn}>Sign in</button>
                    <button className="btn btn-lg btn-primary my-4 mx-4" onClick={handleSignUp}>Sign Up</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2023–2027</p>
                </form>
            </main>
        </div>
    )
}

export default Homepage