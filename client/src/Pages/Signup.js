import Template  from "../components/Template";
import Signupimg from "../assets/signup.png";


const Signup = ({setIsLoggedIn})=>{

return(

    <Template
    
    title="Welcome"
    desc1="Join to Create your Phonebook"
    desc2="Add Delete and Edit Mobile No.."
    image={Signupimg}
    formtype="signup"
    setIsLoggedIn={setIsLoggedIn}

    />
);

}

export default Signup;