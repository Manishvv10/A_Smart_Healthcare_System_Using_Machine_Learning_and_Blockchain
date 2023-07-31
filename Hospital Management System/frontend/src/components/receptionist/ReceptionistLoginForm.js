import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert';

const ReceptionistLoginForm = (props) => {

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    document.body.style.background = '-webkit-linear-gradient(left, #3931af, #00c6ff)';

    const host = "http://127.0.0.1:5000/";

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}api/reception/receptionistlogin`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("success", "Account Created Succesfully !!");
            navigate("/receptionist");
        }
        else {
            props.showAlert("danger", "Invalid Credentials");
        }
    }

    return (
        <>
        <Alert alert={props.alert} />
        <div className="card container col-md-4 my-5" style={{backgroundColor:'#f5f5f5'}}>
            <div className="card-body">
                    <h1 className='text-center mb-4'>Reception Login</h1>
                    <h4 className='text-center mb-4'>Please Sign In To Continue</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exaemailmpleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" >Login</button>
                </form>
            </div>
        </div>
    </>
    )
}

export default ReceptionistLoginForm