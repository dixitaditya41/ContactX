import React from "react";
import logo from "../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const Navbar=(props)=>{

    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn=props.setIsLoggedIn;
  
    async function logooutHandler() {
        try {

            console.log("Cookies:", document.cookie); // Check all cookies
            console.log("Token:", Cookies.get("jwt")); // Check if jwt is accessible

            const response = await axios.get(
                "https://contactx-cdi6.onrender.com/api/auth/logout",
                { withCredentials: true }
                
            );
            setIsLoggedIn(false);
            //navigate("/login");
            toast.success(response.data.message || "Logged Out");
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

 return(
     <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
       
     <Link to="/" >
     <img 
       src={logo} 
      className="h-[100px] w-[160px] object-contain" 
      alt="Logo" 
      loading="lazy"
     />
     </Link>
     <nav>
           <ul className="text-richblack-100 flex gap-x-6">
            <li> <Link to="/" >Home</Link></li>
            <li> <Link to="/contact" >Contact</Link></li>
           </ul>
 
     </nav>

         <div className="flex items-center gap-x-4">
              {!isLoggedIn &&
               <Link to="/login">
                    <button className="bg-richblack-800 text-richblack-100 px-[12px] py-[8px] rounded-[8px] border border-richblack-700 " >
                        Log in
                    </button>
                </Link>
                } 
                {!isLoggedIn &&
                <Link to="/signup">
                    <button className="bg-richblack-800 text-richblack-100 px-[12px] py-[8px] rounded-[8px] border border-richblack-700 ">
                        Sign up
                    </button>
                </Link>
                }
                 {isLoggedIn &&
                <Link to="/">
                    <button className="bg-richblack-800 text-richblack-100 px-[12px] py-[8px] rounded-[8px] border border-richblack-700 " onClick={logooutHandler}>
                        Log Out
                    </button>
                </Link>
                }
                {
                 isLoggedIn &&
                <Link to="/dashboard">
                    <button className="bg-richblack-800 text-richblack-100 px-[12px] py-[8px] rounded-[8px] border border-richblack-700 ">
                        Dashboard
                    </button>
                </Link>

                 }
                
         </div>


     </div>



 );
}

export default Navbar;
