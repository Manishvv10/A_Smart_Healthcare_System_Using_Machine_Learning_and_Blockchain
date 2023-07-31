import React, { useState, useEffect } from 'react'

const ViewDocs = () => {

  const host = 'http://127.0.0.1:5001/'
  const [userDocs, setUserDocs] = useState(null);
  //Get all userdocs
  const getuserdocument = async () => {
    //API call
    const url = `${host}api/auth/user/getuserdocument`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': "application/json",
        'auth-token': localStorage.getItem('digilocker-token')
      },
    });
    const json = await response.json();
    setUserDocs(json);
  }


  useEffect(() => {
    getuserdocument();
  }, [])

  return (
    <div className='container-fluid d-flex my-3 col-md-16 float-left' style={{position:'relative',left:'-125px'}}>
      <div>
        <h2 className='text-center'>Your Documents</h2>
        <div className="table-responsive">
          <table className="table table-hover table-striped my-3">
            <thead>
              <tr>
                <th scope="col">Document ID</th>
                <th scope="col">Document Name</th>
                <th scope="col">Document Description</th>
                <th scope="col">Document Link</th>
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
                  <td>{`https://${userDoc.docRootCid}.ipfs.w3s.link/${userDoc.docName}`}</td>
                  <td><a className="btn btn-success btn-sm" target="_blank" rel="noreferrer" href={`https://${userDoc.docRootCid}.ipfs.w3s.link/${userDoc.docName}`} role="button">View</a></td>
                  <td>{new Date(userDoc.uploadedAt).toDateString()+" "+new Date(userDoc.uploadedAt).toLocaleTimeString()}</td>
                </tr>)
              })}

            </tbody>
          </table>
        </div></div>
    </div>
  )
}

export default ViewDocs