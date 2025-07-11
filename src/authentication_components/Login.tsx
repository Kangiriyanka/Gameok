import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/login.css';
import { useAuthContext } from '../context/AuthContext';



function Login() {

  const {setToken, setUserInfo } = useAuthContext(); 
  const [response, setResponse] = useState("")
  const [loginForm, setLoginForm] = useState({
      username: "",
      password: ""
    })

  const [errorMessage, setErrorMessage] = useState("")

  async function loginUser(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()

      try { 
      const response = await fetch("/api/auth/get_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password
        })  
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
    
      console.log("Response from server:", json);
      console.log(json);
      
      setToken(json.access_token);
      setUserInfo(json.data.username);
     
    } catch(error: any) {

      console.error('Error:', error);
      setResponse(error);

    }

     setLoginForm({username: loginForm.username, password: ""})
   
  }
     // Keep the same object with ... operator  but only change the field "name" with the value inputted in the input field
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) { 
      
  
      const {value, name} = e.target
      setLoginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div className="login-container d-flex s">
        
          <form className="login-form" onSubmit={loginUser}>
          <h2> Login</h2>
            <h6 className="input_title"> Username </h6>
            <input size={30} className="dark_input" onChange={handleChange} 
                  type="text"
                  // This is the name it used in the handleChange function.
                  name="username" 
                  placeholder="Your username" 
                  value={loginForm.username} />
            <h6 className="input_title"> Password </h6>
            <input size={30} className="dark_input" onChange={handleChange} 
                  type="password"
                  name="password" 
                  placeholder="Your password" 
                  value={loginForm.password} />

          <button type="submit" className="login-button" >Login</button>
          
          <div className="registerBox d-flex flex "> 
          

 <p> Not a member? Sign up <Link to="/register">here</Link> </p>

          
          </div>
          
     
           
          <span className="error_message">{errorMessage}</span>
             
        </form>
       
      </div>
    );
}

export default Login;