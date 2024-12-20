const jwt = require("jsonwebtoken");

const createToken = (res,userId) => {

    const token = jwt.sign({id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    // Set JWT as an HTTP-only cookie
    
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return token;
};
module.exports = createToken;



