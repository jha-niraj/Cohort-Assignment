const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    if(!token) {
        console.log("Error");
        res.json({
            msg: "Unauthorized token!!!"
        })
        return;
    }
    try {
        const words = token.split(" ");
        const webToken = words[1];
    
        const decodedValue = jwt.verify(webToken, jwt_secret);
    
        if(decodedValue.username) {
            req.username = decodedValue.username;
            next();
        } else {
            res.status(403).json({
                msg: "User is not authenticated!!!"
            })
        }
    } catch(e) {
        console.log(e);
        res.status(403).json({
            msg: "Token is invald or expired!!!"
        })
    }
}

module.exports = userMiddleware;