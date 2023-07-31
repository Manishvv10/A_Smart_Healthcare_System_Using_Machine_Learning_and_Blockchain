import React from 'react'
const MedicalTest = (props) => {
  return (
    <>
            <div className="container-fluid d-flex my-5 justify-content-center align-items-center">
                <div className="card col-md-10">
                    <div className="card-body text-center">
                        <h2 className='text-center mb-4'>Take a Medical Test</h2>
                        <a className="btn btn-dark btn-lg" target="_blank" rel="noreferrer" href={`http://localhost:5008?aadharNo=${props.patientDetails.aadharNo}`} role="button">Take Medical Test</a>
                    </div>
                </div>
            </div>
        </>
  )
}

export default MedicalTest