import React,{useState} from 'react'
import Alert from '../Alert';


const RegisterDoctor = (props) => {
    const [credentials, setCredentials] = useState({
        fname:"",
        lname:"",
        gender:"",
        email: "",
        password: "",
        mobileno:"",
        dob:"",
        speciality:"",
        fees:"",
        qualification:"",
        experience:""
    })

    const host = "http://127.0.0.1:5000/";
    // document.body.style.backgroundColor = '#f5f5f5';
    // document.body.style.background = '-webkit-linear-gradient(left, #3931af, #00c6ff)';

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}api/auth/doctor/registerdoctor`;
        const response = await fetch(url, {
            method: 'POST',
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
            props.showAlert("success", "Account Created Succesfully !!");
        }
        else {
            props.showAlert("danger", "Invalid Credentials");
        }
        alert("Doctor Registered With the Hospital Successfully!");
    }
  return (
    <>
            <Alert alert={props.alert} />
            <div className="card container col-md-12" >
                <div className="card-body">
                    <h3 className="text-center mb-3">Register A New Doctor</h3>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="fname" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="fname" name="fname" value={credentials.fname} onChange={onChange}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lname" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lname" name="lname" value={credentials.lname} onChange={onChange}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label mb-3">Gender</label> <br/>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="gender" value="male" onChange={onChange}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="gender" value="female" onChange={onChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="gender" value="others" onChange={onChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio3">Others</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                                <label htmlFor="dob" className="form-label mb-1">Date of Birth(DOB)</label> <br/>
                                <div className="col-md-12">
                                    <input type="date" className="form-control datepicker" name="dob" id='dob' value={credentials.dob} min={Date.now()} onChange={onChange}/>
                                </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name='email'  value={credentials.email} onChange={onChange}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="mobileno" className="form-label">Contact / Mobile No.</label>
                            <input type="text" className="form-control" id="mobileno" name='mobileno' value={credentials.mobileno} onChange={onChange}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="experience" className="form-label">Experience (In Years)</label>
                            <input type="number" className="form-control" id="experience" name='experience' value={credentials.experience} onChange={onChange}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="fees" className="form-label">Fees (In Rs.)</label>
                            <input type="number" className="form-control" id="fees" name='fees' value={credentials.fees} onChange={onChange}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="speciality" className="form-label">Specialization</label>
                            <input type="text" className="form-control" id="speciality" name='speciality' placeholder="E.g Eye,Skin" value={credentials.speciality} onChange={onChange}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="qualification" className="form-label">Qualification</label>
                            <input type="text" className="form-control" id="qualification" name='qualification' placeholder="Eg. MBBS" value={credentials.qualification} onChange={onChange}/>
                        </div>
                        {/* <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">State</label>
                            <select id="inputState" className="form-select">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div> */}
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-dark my-3" onClick={handleSubmit}>Register</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
  )
}

export default RegisterDoctor