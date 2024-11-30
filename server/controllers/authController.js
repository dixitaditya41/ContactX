const User = require('../models/userModel');
const createToken = require("../utils/createToken");
const {asyncHandler} = require("../middlewares/asyncHandler");
const bcrypt = require('bcrypt');


const registerRoute = asyncHandler(async(req,res) => {
    const { createpassword, firstname ,lastname, email} = req.body;
    const password = createpassword;
    console.log(req.body);
    if(!firstname || !lastname || !password ||!email){
        throw new Error("Please fill out all the inputs");
    }
    try {
       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
          firstname ,
          lastname,
          email,
          password: hashedPassword
      });

      await newUser.save(); 
        res.status(201).json({ message: "Registration Successful", user: {
            email: newUser.email,
            name: newUser.name,
        }});
    } catch (e) {
        console.error("Error during registration:", e);
        res.status(500).json({ message: "Registration Failed", error: e.message });
    }
})

const loginRoute= asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Please fill out all the inputs" });
    }
    try {
        const user = await User.findOne({email});
        if (user) {
             // console.log(user);
             const isPasswordValid = await bcrypt.compare(password, user.password);

             if (isPasswordValid) {
                 const token = createToken(res, user._id);
                 res.status(200).json({
                     message: "Login Successful",
                     token,
                 });
             } else {
                 res.status(400).json({ message: "Invalid credentials" });
             }
        } else {
            res.status(400).json({ message: "Login Failed" });
        }
    } catch (e) {
        res.status(500).json({ message: "Login Failed" });
    }
})


module.exports = { registerRoute, loginRoute};