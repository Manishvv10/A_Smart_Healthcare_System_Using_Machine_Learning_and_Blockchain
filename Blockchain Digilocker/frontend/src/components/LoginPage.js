import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import { auth, app } from '../firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const LoginPage = (props) => {
    let navigate = useNavigate();
    let adhar;

    const [details, setDetails] = useState({
        aadharNo: "",
        otp: "",
    })

    //   const [credentials, setCredentials] = useState({
    //       email: "",
    //       password: ""
    //   })
    const [credentials, setCredentials] = useState({
        aadharNo: "",
        email: "",
    })

    const [otpState, setOtpState] = useState(true);

    // document.body.style.backgroundColor = '#f5f5f5';
    document.body.style.background = '-webkit-linear-gradient(left, #3931af, #00c6ff)';

    const host = "http://127.0.0.1:5001/";

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
            handleSubmit();
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
        const url = `${host}api/auth/aadhar/aadharlogin`;
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
            email: adhar.email,
        })
        if (json.success) {
            //redirect
            localStorage.setItem('digilocker-token', json.authToken);
            onSignInSubmit(adhar.mobileno);
        }
        else {
            alert("Invalid Credentials");
        }
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        const url = `${host}api/auth/user/userlogin`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ aadharNo:credentials.aadharNo,email: credentials.email })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect
            localStorage.setItem('digilocker-token', json.authToken);
            props.showAlert("success", "Account Created Succesfully !!");
            navigate("/userdashboard");
        }
        else {
            props.showAlert("danger", "Invalid Credentials");
        }
    }

    return (
        <>
            <Alert alert={props.alert} />
            <div className="card container col-md-4 my-5" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="card-body">
                    <h1 className='text-center mb-4'>User Login</h1>
                    <h4 className='text-center mb-4'>Please Sign In To Continue</h4>
                    <form onSubmit={handleSubmit}>
                        {/* <div className="mb-3">
                            <label htmlFor="exaemailmpleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" >Login</button> */}
                        <div id="sign-in-button"></div>

                        <div className="col-auto">
                            <input type="number" className="form-control my-3" id="aadharNo" name='aadharNo' placeholder='Aadhar No.' onChange={onChange} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3" onClick={handleAadharVerification}>Send OTP</button>
                        </div>
                        <div className="col-auto">
                            <input type="number" className="form-control my-3" id="otp" name='otp' placeholder="OTP" onChange={onChange} disabled={otpState} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3" onClick={onOtpSubmit}>Verify & Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage