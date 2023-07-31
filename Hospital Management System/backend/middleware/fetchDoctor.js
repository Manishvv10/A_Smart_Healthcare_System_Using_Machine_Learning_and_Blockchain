const jwt = require("jsonwebtoken");

const JWT_SECRET = "skullcrusher@1963";

const fetchDoctor = (req,res,next) =>{
    // Get the user from the jwt token and id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please use a valid token"});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.doctor = data.doctor;
        next();
    } catch (error) {
        res.status(401).send({error:"Please use a valid token"});
    }
}

module.exports = fetchDoctor;