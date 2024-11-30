import Template from "../components/Template";
import loginimg from "../assets/login.png";


const Login =({setIsLoggedIn})=>{

return(
 
    <Template 
      
    title="Welcome"
    desc1="Join to Create your Phonebook"
    desc2="Add Delete and Edit Mobile No.."
    image={loginimg}
    formtype="login"
    setIsLoggedIn={setIsLoggedIn}
    />

);
}

export default Login;