const express = require("express");
const router = express.Router();
const puppeteer = require('puppeteer-core');
const { PDFDocument, rgb, degrees } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const jsPDF = require('jspdf')
const { execSync } = require('child_process');
const { File } = require('web3.storage');
const { Web3Storage, getFilesFromPath } = require('web3.storage');
const util = require('util');
const multer = require('multer');
const Web3 = require('web3');

const ganacheProviderUrl = 'http://127.0.0.1:7545';
const web3 = new Web3(ganacheProviderUrl);
const contractAddress = `0x8837dc8060495461e98707096ac4F4acF9513BA3`;
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
]
  const contract = new web3.eth.Contract(contractABI, contractAddress);

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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });




// Function to add image watermark to PDF
async function addImageWatermarkToPDF(inputPDFPath, outputPDFPath, watermarkImagePath) {
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(await fs.promises.readFile(inputPDFPath));

    // Load the watermark image
    const watermarkImage = await pdfDoc.embedPng(await fs.promises.readFile(watermarkImagePath));

    // Get the first page of the PDF
    const page = pdfDoc.getPages()[0];

    // Calculate the center position of the page
    const { width, height } = page.getSize();
    const centerX = (width / 2) + (width/3);
    const centerY = (height/8);

    // Add the watermark image to the center of the page
    page.drawImage(watermarkImage, {
        x: centerX - watermarkImage.width / 2,
        y: centerY - watermarkImage.height / 2,
        width: watermarkImage.width / 2,
        height: watermarkImage.height / 2,
        opacity: 1, // Adjust the opacity of the watermark image
    });

    // const filePath = 'C:\\Users\\Manish\\Desktop\\Project_Review_4_Code\\thyroid-classification-deployment\\server\\reports\\report.PDF';

    // // Check if the file already exists
    // if (fs.existsSync(filePath)) {
    //     // If the file exists, delete or remove it
    //     fs.unlinkSync(filePath);
    // }
    // Save the modified PDF to a new file
    const modifiedPDFBytes = await pdfDoc.save();
    await fs.promises.writeFile(outputPDFPath, modifiedPDFBytes);
}


// ROUTE 1 : Generate pdf : POST "/api/auth/reportGen/generatePDFWatermark" No login required.
router.post(
    "/generatePDFWatermark",
    async (req, res) => {
        // let inputPdf = 'C:\\Users\\Manish\\Desktop\\report.PDF';
        let inputPdf = 'C:\\Users\\Manish\\Desktop\\Project_Review_4_Code\\thyroid-classification-deployment\\server\\reports\\report.PDF';
        // let inputPdf = 'C:\\Users\\Manish\\Desktop\\Project_Review_4_Code\\reports\\report.PDF';
        let watermarkImage = 'C:\\Users\\Manish\\Desktop\\Project_Review_4_Code\\thyroid-classification-deployment\\static\\img\\watermark.PNG'
        let outputPdf = 'C:\\Users\\Manish\\Desktop\\Project_Review_4_Code\\thyroid-classification-deployment\\server\\verifiedReports\\verifiedSignedReport.PDF'
        addImageWatermarkToPDF(inputPdf, outputPdf, watermarkImage)
            .then(() => {
                console.log('Image watermark added successfully!');
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
        res.send({ sucess: "Success" })
    }

);




// Upload PDF

const hosts = 'http://127.0.0.1:5001/';

// Construct with token and endpoint
const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2YjRiODQyNkZiRDlFMUYxYmM3M0M4MmE2YzNmNmNCRjEzQWI5MmIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODMwOTk0NDgxMDYsIm5hbWUiOiJEVmF1bHQifQ.f9_38Ssgn0VYaIaAeUNAx_933Wyd4VAoggXgEikNTyw' })


const uploadDocs = async (details) => {
    console.log("Adding a Entry");
    const url = `${hosts}api/auth/user/uploadgenerateddocs`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': "application/json",
        },
        body: JSON.stringify(details)
    });
    const json = await response.json();
    console.log(json);
    insertCID(details.docRootCid);
}


// ROUTE 2 : Upload pdf : POST "/api/auth/reportGen/upload" No login required.

router.post('/upload', upload.single('file'), async (req, res) => {
    try {

        const fileName = `verifiedSignedReport.PDF`;
        const fileData = fs.readFileSync(`verifiedReports/${fileName}`);
        const fileBuffer = Buffer.from(fileData);
        const file = new File([fileBuffer], fileName);

        // Pack files into a CAR and send to web3.storage
        const rootCid = await client.put([file]) // Promise<CIDString>
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
            docCID: files[0].cid,
            docRootCid: rootCid,
            aadharNo: req.body.aadharNo
        }
        for (const file of files) {
            console.log(`${file.cid} ${file.name} ${file.size}`)
            console.log(`https://${rootCid}.ipfs.w3s.link/${file.name}`)
        }
        uploadDocs(details);
    } catch (error) {
        console.error('Error uploading file:', error);
    }


    // Delete generated Report from folder
    const folderPath = 'C:\\Users\\Manish\\Desktop\\Project_Review_4_Code\\thyroid-classification-deployment\\server\\reports';

    // Read the contents of the folder
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        // Iterate over the files in the folder
        files.forEach((file) => {
            // Construct the full path to the file
            const filePath = path.join(folderPath, file);

            // Delete the file
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return;
                }

                console.log('File deleted:', filePath);
            });
        });
    });
    res.json("success");
});

module.exports = router;
