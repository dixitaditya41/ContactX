const jwt = require("jsonwebtoken");
const { asyncHandler } = require("./asyncHandler");
const User = require("../models/userModel");

const authenticate = asyncHandler(async (req, res, next) => {
    
    let token = req.cookies.jwt;
    //console.log(token);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: "Not Authorized, user not found" });
            }
            //console.log(req.user);
            next();
        } catch (error) {
            // Handle token verification errors
            return res.status(401).json({ message: "Not Authorized, token failed" });
        }
    } else {
       
        return res.status(401).json({ message: "Not Authorized, token not exist" });
    }
});



module.exports = { authenticate};
