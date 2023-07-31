import React, { useState } from 'react';
import Alert from '../Alert';
import { useNavigate } from 'react-router-dom';
import { auth, app } from '../../firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const EmergencyAdmForm = (props) => {

    let navigate = useNavigate();
    let adhar;

    const [details, setDetails] = useState({
        aadharNo: "",
        otp: "",
    })

    const [credentials, setCredentials] = useState({
        aadharNo: "",
        fname: "",
        lname: "",
        gender: "",
        dob: "",
        email: "",
        address: "",
        mobileno: "",
        casualtyDescription: "",
        casualtyLevel: ""
    })

    document.body.style.background = '-webkit-linear-gradient(left, #3931af, #00c6ff)';

    const [otpState, setOtpState] = useState(true);
    const [displayDetails, setDisplayDetails] = useState(false);
    // for hms databse
    const host = "http://127.0.0.1:5000/";

    //for aadhar database
    const host2 = "http://127.0.0.1:5001/";

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    // Phone OTP Verification

    const onSignInSubmit = (mobileNo) => {
        // e.preventDefault();
        configureCaptcha();
        const phoneNumber = "+91" + mobileNo;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                alert("OTP has been sent!! Please check your Phone!");
                setOtpState(false);
                // ...
            }).catch((error) => {
                console.log("Error Occurred : " + error)
            });

    }

    const onOtpSubmit = (e) => {
        e.preventDefault();
        const code = details.otp;
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user);
            console.log("User is Verified!!");
            alert("Aadhar Authentication Succesfully !!");
            setDisplayDetails(true);
            // ...
        }).catch((error) => {
            console.log("Error Occurred : " + error)
        });
    }

    const configureCaptcha = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        }, auth);
    }

    const handleAadharVerification = async (e) => {
        e.preventDefault();
        const url = `${host2}api/auth/aadhar/aadharlogin`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ aadharNo: details.aadharNo })
        });
        const json = await response.json();
        adhar = json.aadhar;
        console.log(adhar)
        setCredentials({
            aadharNo: adhar.aadharNo,
            fname: adhar.firstName,
            lname: adhar.lastName,
            gender: adhar.gender,
            dob: adhar.dob,
            email: adhar.email,
            address: adhar.address,
            mobileno: adhar.mobileno,
            casualtyDescription: credentials.casualtyDescription,
            casualtyLevel: credentials.casualtyLevel
        })
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken);
            onSignInSubmit(adhar.mobileno);
        }
        else {
            alert("Invalid Credentials");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}api/emergency/admitpatient`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                aadharNo: credentials.aadharNo,
                fname: credentials.fname,
                lname: credentials.lname,
                gender: credentials.gender,
                dob: credentials.dob,
                email: credentials.email,
                address: credentials.address,
                mobileno: credentials.mobileno

            })
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
        alert("Case Registered Successfully! Please login with your credentials to track the status of your case!");
    }

    const handleExit = () => {
        navigate('/');
    }

    return (
        <>
            <Alert alert={props.alert} />
            <div className="card container col-md-10" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="card-body">
                    <h4 className="text-center mb-3">Please Fill Up The Below Form For Admitting The Patient</h4>
                    <form className="row g-3">
                        <div id="sign-in-button"></div>

                        <div className="col-auto col-md-5">
                            <input type="number" className="form-control" id="aadharNo" name='aadharNo' placeholder='Aadhar No.' onChange={onChange} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3" onClick={handleAadharVerification}>Send OTP</button>
                        </div>
                        <div className="col-auto col-md-5">
                            <input type="number" className="form-control" id="otp" name='otp' placeholder="OTP" onChange={onChange} disabled={otpState} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3" onClick={onOtpSubmit}>Verify</button>
                        </div>


                        {displayDetails && <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="fname" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="fname" name="fname" value={credentials.fname} onChange={onChange} disabled />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lname" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="lname" name="lname" value={credentials.lname} onChange={onChange} disabled />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-3">Gender</label> <br />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="gender" value="male" onChange={onChange} checked={credentials.gender === "male"} disabled />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="gender" value="female" onChange={onChange} checked={credentials.gender === "female"} disabled />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="gender" value="others" onChange={onChange} disabled />
                                    <label className="form-check-label" htmlFor="inlineRadio3">Others</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dob" className="form-label mb-1">Date of Birth(DOB)</label> <br />
                                <div className="col-md-12">
                                    <input type="date" className="form-control datepicker" name="dob" id='dob' value={credentials.dob.substring(0, 10)} min={Date.now()} onChange={onChange} disabled />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} disabled />
                            </div>
                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" name='address' placeholder="1234 Main St" value={credentials.address} onChange={onChange} disabled />
                            </div>
                            <div className="col-12">
                                <label htmlFor="mobileno" className="form-label">Contact / Mobile No.</label>
                                <input type="text" className="form-control" id="mobileno" name='mobileno' value={credentials.mobileno} onChange={onChange} disabled />
                            </div>
                            <div className="col-md-6 my-3">
                                <div className="mb-3">
                                    <label htmlFor="casualtyLevel" className="form-label"><h6>Casualty Level:</h6></label>
                                    <textarea className="form-control" id="casualtyLevel" name="casualtyLevel" rows="5" onChange={onChange} ></textarea>
                                </div>
                            </div>
                            <div className="col-md-6 my-3">
                                <div className="mb-3">
                                    <label htmlFor="casualtyDescription" className="form-label"><h6>Casualty Description:</h6></label>
                                    <textarea className="form-control" id="casualtyDescription" name="casualtyDescription" rows="5" onChange={onChange} ></textarea>
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary mt-2 mb-2 mx-3" onClick={handleSubmit}>Admit</button>
                                <button className="btn btn-primary mt-2 mb-2 mx-3" onClick={handleExit}>Go Back </button>
                            </div>
                        </div>}
                    </form>
                </div>
            </div>

        </>
    )
}

export default EmergencyAdmForm