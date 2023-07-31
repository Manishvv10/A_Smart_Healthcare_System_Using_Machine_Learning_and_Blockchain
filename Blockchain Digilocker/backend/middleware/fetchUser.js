const jwt = require("jsonwebtoken");

const JWT_SECRET = "skullcrusher@1963";

const fetchUser = (req,res,next) =>{
    // Get the user from the jwt token and id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please use a valid token"});
    }
    try {
        // const data = jwt.verify(token,JWT_SECRET);
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        console.log(data)
        next();
    } catch (error) {
        res.status(401).send({error:"Please use a valid token"});
    }
}

module.exports = fetchUser;