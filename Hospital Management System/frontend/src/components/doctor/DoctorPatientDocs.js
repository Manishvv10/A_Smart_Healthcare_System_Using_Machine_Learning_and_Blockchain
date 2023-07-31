import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import doctorContext from '../../context/doctor/doctorContext';
import patientContext from '../../context/patient/patientContext';
import { auth, app } from '../../firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const DoctorPatientDocs = () => {
    let adhar;
    let patientDetails;
    const [details, setDetails] = useState({
        otp: "",
    })

    const host1 = 'http://127.0.0.1:5000/'
    const host2 = 'http://127.0.0.1:5001/'

    const { id } = useParams();
    let doctorcontext = useContext(doctorContext);
    let patientcontext = useContext(patientContext);
    const { appointmentbyid, fetchalldocappointmentbyid } = doctorcontext;
    // const { patientDetails, getpatientdetailsbyid } = patientcontext;
    // const [patientDetails, setPatientDetails] = useState(null);
    // const [patientAadhar, setPatientAadhar] = useState(null);
    const [userDocs, setUserDocs] = useState(null);
    const [btnHidden, setBtnHidden] = useState(false);
    const [otpHideForm, setOtpHideForm] = useState(true);
    const [credentials, setCredentials] = useState({
        aadharNo: "",
        email: "",
    })
    const [otpState, setOtpState] = useState(false);
    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    // const getPatienDetails = async () => {
    //     console.log(appointmentbyid.patient);
    // }

    //Get patient details by patient id
    const getpatientdetailsbyid = async () => {
        //API call
        const url = `${host1}api/auth/patient/getpatientbyid`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify({ patientId: appointmentbyid.patient })
        });
        const json = await response.json();
        // console.log(json)
        patientDetails = json
        handleAadharVerification();
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
                setOtpHideForm(false);
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
            fetchDocs();
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
        console.log(patientDetails);
        // e.preventDefault();
        const url = `${host2}api/auth/aadhar/aadharlogin`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ aadharNo: patientDetails.aadharNo })
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
            localStorage.setItem('token', json.authToken);
            onSignInSubmit(adhar.mobileno);
        }
        else {
            alert("Invalid Credentials");
        }
    }


    //Get all userdocs
    const getuserdocument = async () => {
        //API call
        console.log(appointmentbyid);
        const url = `${host2}api/auth/user/getuserdocumentbyemail`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ email: appointmentbyid.patientEmail })
        });
        const json = await response.json();
        setUserDocs(json);
    }


    useEffect(() => {
        fetchalldocappointmentbyid(id);
        // eslint-disable-next-line
    }, [])

    const fetchDocs = () => {
        getuserdocument();
        setBtnHidden(true);
        setOtpHideForm(true);
    }

    return (
        <div className='container my-3'>
            <div>
                <h2 className='text-center'>Patient's Documents & Reports</h2>
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Document ID</th>
                                <th scope="col">Document Name</th>
                                <th scope="col">Document Description</th>
                                <th scope="col">View/Download Document</th>
                                <th scope="col">Upload At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDocs && userDocs.map((userDoc) => {
                                return (<tr key={userDoc._id} >
                                    <td>{userDoc._id}</td>
                                    <td>{userDoc.docName}</td>
                                    <td>{userDoc.docDescription}</td>
                                    <td><a className="btn btn-success btn-sm" target="_blank" rel="noreferrer" href={`https://${userDoc.docRootCid}.ipfs.w3s.link/${userDoc.docName}`} role="button">View</a></td>
                                    <td>{new Date(userDoc.uploadedAt).toDateString() + " " + new Date(userDoc.uploadedAt).toLocaleTimeString()}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    <div className="container text-center">
                        <button className='btn btn-primary' onClick={getpatientdetailsbyid} hidden={btnHidden}>Fetch Documents from Patient's Digital Vault</button>
                    </div>
                    <div className="container text-center" hidden={otpHideForm}>
                        <form>
                            <div id="sign-in-button"></div>

                            <div>
                                <input type="number" className="form-control my-3" id="otp" name='otp' placeholder="OTP" onChange={onChange} disabled={otpState} />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary mb-3" onClick={onOtpSubmit}>Verify & Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorPatientDocs