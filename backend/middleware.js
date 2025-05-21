const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "No token provided"
        });
    }
    const actualToken = token.split(' ')[1];

    const verifiedValue = jwt.verify(actualToken, JWT_SECRET);
    if(verifiedValue.username){
        req.username = verifiedValue.username;
        next();
    } else{
        res.status(403).json({
            msg: 'You are not authenticated'
        })
    }
}


module.exports = {
    authMiddleware
};