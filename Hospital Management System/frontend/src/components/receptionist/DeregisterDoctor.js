import React,{useState} from 'react'
import Alert from '../Alert';

const DeregisterDoctor = (props) => {
    const [credentials, setCredentials] = useState({
        doctorId:""
    })

    const host = "http://127.0.0.1:5000/";
    // document.body.style.backgroundColor = '#f5f5f5';
    // document.body.style.background = '-webkit-linear-gradient(left, #3931af, #00c6ff)';

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}api/auth/doctor/deletedoctorbyid`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': "application/json",
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(credentials)
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect
            props.showAlert("success", "Doctor Deregistered Succesfully !!");
        }
        else {
            props.showAlert("danger", "Invalid Credentials");
        }
        alert("Doctor De-Registered With the Hospital Successfully!");

    }

  return (
    <>
            <Alert alert={props.alert} />
            <div className="card container col-md-112" >
                <div className="card-body">
                    <h3 className="text-center mb-3">Deregister Doctor</h3>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label htmlFor="doctorId" className="form-label">Doctor ID</label>
                            <input type="text" className="form-control" id="doctorId" name="doctorId" value={credentials.doctorId} onChange={onChange}/>
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-dark my-3" onClick={handleSubmit}>De-Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
  )
}

export default DeregisterDoctor