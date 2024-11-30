import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signupform({ setIsLoggedIn }) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    createpassword: "",
    confirmpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const[confirmShowPassword,setconfirmShowPassword]=useState(false);

  
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]:event.target.value,
    }));
  }
  
  async function submitHandler(event){
    

    event.preventDefault();

    const response = await axios.post("https://contactx-cdi6.onrender.com/api/auth/register",formData, {
      withCredentials: true,
    });
    
    console.log(response.data);
    
    setIsLoggedIn(true);
    toast.success("Account Created");
    navigate("/dashboard");

  }

  return (
    <div>
  
      <form onSubmit={submitHandler}>
        {/* first and last name */}
        <div className="flex gap-x-4 mt-[20px]" > 
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstname"
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={formData.firstname}
              className="w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] "
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastname"
              placeholder="Enter Last Name"
              onChange={changeHandler}
              value={formData.lastname}
              className="w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] "
            />
          </label>
        </div>
          {/* email */}
         <div  className="mt-[20px]">
      
         <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Email Address<sup className="text-pink-200">*</sup></p>
          
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Enter email address"
              className="w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] "
            />
              </label>
  

         </div>
         {/* create and confirm password */}
        <div className="flex gap-x-4  mt-[20px]">
          <label className="relative w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
      
              <input
                required
                type={showPassword ? "text" : "password"}
                name="createpassword"
                placeholder="Enter Password"
                onChange={changeHandler}
                value={formData.createpassword}
                className="w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] "
              />
              <span className="absolute right-3 top-[38px] cursor-pointer" onClick={() => setShowPassword((prev) => !prev)} >
                {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
              </span>
        
          </label>
                      
          <label className="relative w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="confirmpassword"
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={formData.confirmpassword}
              className="w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] "
            />

           <span className="absolute right-3 top-[38px] cursor-pointer" onClick={() =>  setconfirmShowPassword((prev) => !prev)} >
            {confirmShowPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
              </span>
          </label>
        </div>
        
        <button className="w-full bg-yellow-50 font-medium rounded-[8px] text-richblack-900 px-[12px] py-[8px] mt-6">Create Account</button>

      </form>
    </div>
  );
}

export default Signupform;
