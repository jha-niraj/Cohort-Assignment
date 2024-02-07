const jwt = require("jsonwebtoken");
const {jwt_secret} = require('../config');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const webToken = words[1];

    try {
        const decodedValue = jwt.verify(webToken, jwt_secret);
    
        if(decodedValue.username) {
            next();
        } else {
            res.status(403).json({
                msg: "User is not authenticated!!!"
            })
        }
    } catch(error) {
        res.json({
            msg: error
        })
    }
}

module.exports = adminMiddleware;