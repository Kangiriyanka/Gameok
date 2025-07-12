import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';



export default function Login() {

  const {setToken, setUserInfo } = useAuthContext(); 
  const navigate = useNavigate();
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
      console.log(json);
      
      setToken(json.access_token);
      setUserInfo(json.username);
      

      navigate("/")
      
     
    } catch(error: any) {
   
      console.error('Error:', error);
      setErrorMessage(error.msg)
     

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
      <div className="">
           <div className="page-header" style={{textAlign: "center"}}>
           <h1> Gameok Login </h1>
           
        </div> 
          <form className="reg-form"  style={{margin: "0 auto"}}onSubmit={loginUser}>
        
          
            <label>
              Username
            <input
               
                  onChange={handleChange} 
                  type="text"
                  // This is the name it used in the handleChange function.
                  name="username" 
                  placeholder="Your username" 
                  value={loginForm.username} />
            </label>
            <label> Password
            <input 
                  onChange={handleChange} 
                  type="password"
                  name="password" 
                  placeholder="Your password" 
                  value={loginForm.password} />
            </label>

          <button type="submit" className="form-button" >Login</button>
          
          <div style= {{margin: "-1.5rem auto"}}> 
          
          
          Not a member? Sign up <Link className=" underline text-[var(--accent-clr)]"to="/register">here</Link> 

          </div>
          
     
           
          <span className="error-message">{errorMessage}</span>
             
        </form>
       
      </div>
    );
}

