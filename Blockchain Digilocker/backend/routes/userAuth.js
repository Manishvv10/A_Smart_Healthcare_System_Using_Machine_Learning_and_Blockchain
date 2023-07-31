const express = require("express");
const router = express.Router();
const User = require('../models/User');
const docFormat = require('../models/DocFormat')
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "skullcrusher@1963";

// ROUTE 1 : Register a Patient using : POST "/api/auth/user/registeruser"No login required.
router.post(
    "/registeruser",
    [
        body("fname", "The name must be atleast 3 characters!!").isLength({
            min: 3,
        }),
        body("lname", "The name must be atleast 3 characters!!").isLength({
            min: 3,
        }),
        body("email", "Please Enter a valid email!!").isEmail(),
        body("mobileno", "The mobile no. must be of 10 digits!!").isLength({
            min: 10,
        }),
    ],
    async (req, res) => {
        // if there are errors return Bad Request and errors
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        // check whether patient with same email exists
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({ error: "Sorry a patient with same email already exists" });
            }

            // const salt = await bcrypt.genSalt(10);
            // const secPass = await bcrypt.hash(req.body.password, salt);

            //Create a new patient
            user = await User.create({
                aadharNo:req.body.aadharNo,
                fname: req.body.fname,
                lname: req.body.lname,
                gender: req.body.gender,
                email: req.body.email,
                mobileno: req.body.mobileno,
                dob:req.body.dob,
                address: req.body.address,
            });

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success,authToken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE2 : Authenticate a Patient using : POST "/api/auth/user/userlogin" No login required.
router.post(
    "/userlogin",
    // [
    //     body("email", "Please Enter a valid email!!").isEmail(),
    //     body("aadharNo", "Aadhar No Cannot be blank!!").exists(),
    // ],
    async (req, res) => {

        let success = false;
        // if there are errors return Bad Request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }

        const { aadharNo, email } = req.body;
        try {
            let user = await User.findOne({ aadharNo:aadharNo,email:email });
            console.log(user)
            if (!user) {
                success = false;
                return res
                    .status(400)
                    .json({ success,error: "Please Enter Correct Credentials!!" });
            }

            // const passwordCompare = await bcrypt.compare(password, user.password);
            // if (!passwordCompare) {
            //     return res
            //         .status(400)
            //         .json({ success,error: "Please Enter Correct Credentials!!" });
            // }

            const payload = {
                user: {
                    id: user._id,
                },
            };
            console.log(payload)
            const authToken = jwt.sign(payload, JWT_SECRET);
            success =true;
            res.json({ success,authToken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 3:Get logged-in patient details using : POST /api/auth/user/getuser. Login Required
router.get(
    "/getuser",
    fetchUser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 4:Uploading Documents by logged-in patient details using : POST /api/auth/user/uploaddocs. Login Required
router.post(
    "/uploaddocs",
    fetchUser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            console.log(userId);
            const { docName,docDescription,docCID,docRootCid,usergivendocName } = req.body;
            const user = await User.findById(userId).select("-password");
            console.log(user._id);
            const docformat = docFormat.create({
                user:user._id,
                userfname:user.fname,
                userlname:user.lname,
                email:user.email,
                mobileno:user.mobileno,
                usergivendocName:usergivendocName,
                docName:docName,
                docDescription:docDescription,
                docCID:docCID,
                docRootCid:docRootCid
            })
            res.send(docformat)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
    );

// ROUTE 5:Uploading generated reports to patients locker using : POST /api/auth/user/uploadgenerateddocs. No Login Required
function generateUniqueID() {
    const timestamp = Date.now().toString(); // current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // random number between 0 and 999
    const uniqueID = timestamp + randomNum.toString().padStart(3, '0'); // combine timestamp and random number
    return uniqueID;
  }  

router.post(
    "/uploadgenerateddocs",
    async (req, res) => {
        try {
            const { docName,docCID,docRootCid,aadharNo } = req.body;
            const user = await User.findOne(aadharNo).select("-password");
            const usergivendocName = user.aadharNo + "_ThyroidReport";
            const docDescription = "Thyroid Report For Patient "+user.fname+" "+user.lname+" dated "+ new Date();
            const docformat = docFormat.create({
                user:user._id,
                userfname:user.fname,
                userlname:user.lname,
                email:user.email,
                mobileno:user.mobileno,
                usergivendocName:usergivendocName,
                docName:docName,
                docDescription:docDescription,
                docCID:docCID,
                docRootCid:docRootCid
            })
            res.send(docformat)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
    );
    
// ROUTE 6:Get logged-in users documents details using token: GET /api/auth/user/getuserdocument. Login Required
    router.get(
        "/getuserdocument",
        fetchUser,
        async (req, res) => {
            try {
                const userId = req.user.id;
                const userDocs = await docFormat.find({user:userId});
                res.send(userDocs)
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal Server Error");
            }
        }
    );

// ROUTE 5:Get logged-in users documents details using email : GET /api/auth/user/getuserdocumentbyemail. No Login Required
    router.post(
        "/getuserdocumentbyemail",
        async (req, res) => {
            try {
                const { email } = req.body;
                const userDocs = await docFormat.find({email:email});
                res.send(userDocs)
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal Server Error");
            }
        }
    );
module.exports = router;
