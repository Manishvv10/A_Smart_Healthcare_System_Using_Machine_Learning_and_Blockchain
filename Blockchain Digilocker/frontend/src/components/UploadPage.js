import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import Web3 from 'web3';

const UploadPage = () => {

  const host = 'http://127.0.0.1:5001/';
  const ganacheProviderUrl = 'http://127.0.0.1:7545';
  const web3 = new Web3(ganacheProviderUrl);
  const contractAddress = `0x4F846924d1f5D0D4277505552BAAAD1318fd5F30`;

  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "name": "storeCID",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cidCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "cids",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contract = new web3.eth.Contract(contractABI, contractAddress);


  const [docDescription, setDocDescription] = useState('');
  const [usergivendocName, setusergivendocName] = useState('')

  const onChangeDescription = (e) => {
    setDocDescription(e.target.value);
  }

  const onChangedocname = (e) => {
    setusergivendocName(e.target.value);
  }

  async function insertCID(rootCid) {
    try {
      const accounts = await web3.eth.getAccounts();
      const transaction = await contract.methods.storeCID(rootCid).send({
        from: accounts[0],
        gas: 3000000, // Adjust gas limit as per your contract's requirements
      });
      console.log('Transaction successful:', transaction);
    } catch (error) {
      console.error('Failed to insert CID:', error);
    }
  }

  // Construct with token and endpoint
  const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2YjRiODQyNkZiRDlFMUYxYmM3M0M4MmE2YzNmNmNCRjEzQWI5MmIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODMwOTk0NDgxMDYsIm5hbWUiOiJEVmF1bHQifQ.f9_38Ssgn0VYaIaAeUNAx_933Wyd4VAoggXgEikNTyw' })

  const handleUpload = async (e) => {
    e.preventDefault();
    const fileInput = document.querySelector('input[type="file"]')
    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(fileInput.files) // Promise<CIDString>
    // setrootCid(rootCid);
    console.log("rootCid is:", rootCid);
    // Get info on the Filecoin deals that the CID is stored in
    const info = await client.status(rootCid) // Promise<Status | undefined>
    console.log("Info is:", info);

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid) // Promise<Web3Response | null>
    const files = await res.files() // Promise<Web3File[]>
    console.log("Response is :", files);
    console.log("Files Name is:", files);

    //making details object for passing to body of request
    const details = {
      docName: files[0].name,
      docDescription: docDescription,
      docCID: files[0].cid,
      docRootCid: rootCid,
      usergivendocName: usergivendocName,
    }
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
      console.log(`https://${rootCid}.ipfs.w3s.link/${file.name}`);
    }
    uploadDocs(details);
  }


  const uploadDocs = async (details) => {
    console.log("Adding a Entry");
    const url = `${host}api/auth/user/uploaddocs`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': "application/json",
        'auth-token': localStorage.getItem('digilocker-token')
      },
      body: JSON.stringify(details)
    });
    const json = await response.json();
    console.log(json);
    alert("Document Uploaded Successfully");
    insertCID(details.docRootCid);
  }


  return (
    <div className="container">
      <div className="container my-4">
        <h1>Upload A Document</h1>
        <form onSubmit={handleUpload} className="my-3">
          <div className="mb-3">
            <label htmlFor="usergivendocName" className="form-label">Document Name</label>
            <input type="text" className="form-control" id="usergivendocName" name='usergivendocName' placeholder="Enter Document Name Here" onChange={onChangedocname} />
          </div>
          <div className="input-group mb-3">
            <input type="file" className="form-control" id="uploadfile" name='uploadfile' />
            <label className="input-group-text" htmlFor="uploadfile">Upload</label>
          </div>
          <div className="mb-3">
            <label htmlFor="docDescription" className="form-label">Document Description</label>
            <textarea className="form-control" id="docDescription" name='docDescription' rows="5" onChange={onChangeDescription} minLength={5} required></textarea>
          </div>
          <button className="btn btn-primary">Upload</button>
        </form>
      </div>
    </div>
  )
}

export default UploadPage