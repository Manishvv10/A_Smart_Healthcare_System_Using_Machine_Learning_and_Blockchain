const express = require("express");
const router = express.Router();
const Aadhar = require('../models/aadharFormat');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "skullcrusher@1963";

// ROUTE 1 : Register a Patient using : POST "/api/auth/aadhar/createaadhar"No login required.
router.post(
    "/createaadhar",
    [
        body("firstName", "The name must be atleast 3 characters!!").isLength({
            min: 3,
        }),
        body("lastName", "The name must be atleast 3 characters!!").isLength({
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
        // check whether a user with same email exists
        try {
            let aadhar = await Aadhar.findOne({ email: req.body.email });
            if (aadhar) {
                return res
                    .status(400)
                    .json({ error: "Sorry a user with same email already exists" });
            }

            //Create a new aadhar
            aadhar = await Aadhar.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                email: req.body.email,
                mobileno: req.body.mobileno,
                dob:req.body.dob,
                address: req.body.address,
            });

            const data = {
                aadhar: {
                    id: aadhar.id,
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

// ROUTE2 : Authenticate a Patient using : POST "/api/auth/aadhar/aadharlogin" No login required.
router.post(
    "/aadharlogin",
    // [
    //     body("aadharNo", "Please Enter a valid aadhar No!!").isNumeric(),
    // ],
    async (req, res) => {

        let success = false;
        // if there are errors return Bad Request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }

        const { aadharNo} = req.body;
        try {
            let aadhar = await Aadhar.findOne({ aadharNo });
            if (!aadhar) {
                success = false;
                return res
                    .status(400)
                    .json({ success,error: "Please Enter Correct Aadhar No.!!" });
            }

            // const passwordCompare = await bcrypt.compare(password, user.password);
            // if (!passwordCompare) {
            //     return res
            //         .status(400)
            //         .json({ success,error: "Please Enter Correct Credentials!!" });
            // }

            const payload = {
                aadhar: {
                    id: aadhar.id,
                },
            };
            const authToken = jwt.sign(payload, JWT_SECRET);
            success =true;
            res.json({success,authToken,aadhar});
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
            const { docName,docDescription,docCID,docRootCid,usergivendocName } = req.body;
            const user = await User.findById(userId).select("-password");
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
    
// ROUTE 5:Get logged-in users documents details using token: GET /api/auth/user/getuserdocument. Login Required
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
