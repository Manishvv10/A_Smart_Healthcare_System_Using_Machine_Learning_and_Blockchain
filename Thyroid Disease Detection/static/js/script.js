
const host = "http://127.0.0.1:5000/"
//Get patient details by aadhar
let patientDetails = {};
let bloodParameters = {};
let result = "";


const initializeAadharNo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('aadharNo');
    localStorage.setItem('aadharNo', value);
    console.log(value)
    document.getElementById('aadharNo').innerText = value;
}

const setResult = async () => {
    result = document.getElementById('predictionText').innerText;
    localStorage.setItem('result', result);
    bloodParameters = document.getElementById('bloodParam').innerHTML;
    localStorage.setItem('bloodParams', bloodParameters)
}

const getpatientdetailsbyaadhar = async () => {
    //API call
    const url = `${host}api/auth/patient/getpatientbyaadhar`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': "application/json",
        },
        body: JSON.stringify({ aadharNo: localStorage.getItem('aadharNo') })
    });
    const json = await response.json();
    patientDetails = json;
    console.log(patientDetails);
    populateFields();
}

const populateFields = async () => {

    // populating patient details from patientDetails variable
    console.log(bloodParameters)
    document.getElementById('aadharNo').innerText = patientDetails.aadharNo;
    let date = new Date();
    document.getElementById('dated').innerText = date;
    document.getElementById('patientId').innerText = patientDetails._id;
    document.getElementById('patientName').innerText = patientDetails.fname + " " + patientDetails.lname;
    document.getElementById('patientContact').innerText = patientDetails.mobileno;
    document.getElementById('patientEmail').innerText = patientDetails.email;

    // populating blood parameters from bloodParameters variable
    bloodParameters = JSON.parse(localStorage.getItem('bloodParams'));
    console.log(bloodParameters)
    document.getElementById('tsh').innerText = bloodParameters.TSH;
    document.getElementById('t3').innerText = bloodParameters.T3;
    document.getElementById('t4u').innerText = bloodParameters.T4U;
    document.getElementById('fti').innerText = bloodParameters.FTI;
    document.getElementById('on_thyroxine').innerText = bloodParameters.onthyroxine;
    document.getElementById('query_on_thyroxine').innerText = bloodParameters.queryonthyroxine;
    document.getElementById('on_anti_thyroid_medication').innerText = bloodParameters.onantithyroidmedication;
    document.getElementById('sick').innerText = bloodParameters.sick;
    document.getElementById('pregnant').innerText = bloodParameters.pregnant;
    document.getElementById('thyroid_surgery').innerText = bloodParameters.thyroidsurgery;
    document.getElementById('I131_treatment').innerText = bloodParameters.I131treatment;
    document.getElementById('query_hypothyroid').innerText = bloodParameters.queryhypothyroid;
    document.getElementById('query_hyperthyroid').innerText = bloodParameters.queryhyperthyroid;
    document.getElementById('lithium').innerText = bloodParameters.lithium;
    document.getElementById('goitre').innerText = bloodParameters.goitre;
    document.getElementById('tumor').innerText = bloodParameters.tumor;
    document.getElementById('hypopituitary').innerText = bloodParameters.hypopituitary;
    document.getElementById('psych').innerText = bloodParameters.psych;

    // populating result from result variable
    document.getElementById('result').innerText = "The Result of The Test is: " + localStorage.getItem('result');
}

const generatePDF = async () => {
    let element = document.getElementById('closeBtn');
    if (element.style.display === "none") {
      element.style.display = "block"; // Show the element
    } else {
      element.style.display = "none"; // Hide the element
    }
    setTimeout(() => {
      if (element.style.display === "none") {
        element.style.display = "block"; // Show the element
      } else {
        element.style.display = "none"; // Hide the element
      }
    }, 2000);
    document.getElementById('generatePdfButton').style.display = 'none';
    var options = {
        margin: 0,
        filename: 'report.pdf',
        output: './reportWatermark.PDF',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        // Add the onAfterPageContent callback to remove blank pages
        onAfterPageContent: function (currentPage, totalPages) {
            // Get the current page content
            var currentPageContent = document.querySelector(`.html2pdf-page-${currentPage}`).innerHTML;

            // Remove the page if it is blank (no content)
            if (currentPageContent.trim() === '') {
                document.querySelector(`.html2pdf-page-${currentPage}`).remove();
            }
        }
    };

    await html2pdf().set(options).from(document.documentElement).save('report.pdf');
    // //   Create a new jsPDF instance
    setTimeout(() => {
        generatePDFWatermark();
    }, 500);
}


const generatePDFWatermark = async () => {
    const host2 = "http://127.0.0.1:5010/";
    //API call
    const url = `${host2}api/auth/reportGen/generatePDFWatermark`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': "application/json",
        },
    });
    console.log("End")
    setTimeout(() => {
      console.log("Inside SetTimeout");
      uploadPDF();
      // uploadFile();
    }, 1000);
}

const uploadPDF = async () => {
    const host2 = "http://127.0.0.1:5010/";
    //API call
    const url = `${host2}api/auth/reportGen/upload`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': "application/json",
        },
    });
    const json = await response.json();
    if(json == "success"){
        alert("Document Published To Patient's Digital Locker !!!");
    }
    else{
        alert("Some Error Occurred !!!");
    }
}



 


