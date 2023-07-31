import React, {useState } from 'react'

const PatientDocsReports = (props) => {

    const host = 'http://127.0.0.1:5001/'
    const [userDocs, setUserDocs] = useState(null);

    //Get all userdocs
    const getuserdocument = async () => {
        //API call
        console.log(props.patientDetails);
        const url = `${host}api/auth/user/getuserdocumentbyemail`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body:JSON.stringify({email:props.patientDetails.email})
        });
        const json = await response.json();
        setUserDocs(json);
    }

    const fetchDocs = ()=>{
        getuserdocument();
    }

    return (
        <div className='container my-3'>
            <div>
                <h2 className='text-center'>Your Documents And Reports</h2>
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
                </div>
                <div className="container text-center">
                        <button className='btn btn-primary' onClick={fetchDocs}>Fetch Documents from My Digital Vault</button>
                    </div>
                </div>
        </div>
    )
}

export default PatientDocsReports