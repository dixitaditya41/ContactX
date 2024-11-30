const express = require('express'); 
const { registerRoute, loginRoute} = require('../controllers/authController.js');
const {authenticate} = require('../middlewares/authMiddleware.js');
const router = express.Router();   



router.post('/register', registerRoute);
router.post('/login', loginRoute);
router.get('/logout',authenticate,(req,res)=>{
    res.clearCookie('jwt');
    res.status(200).json({message:"Logout Successful"});
})



module.exports = router;
