import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { fetchWithCSRF } from '../assets/scripts/csrf';
import {motion} from "motion/react"
import ErrorBox from '../animation_components/ErrorBox';



export default function Login() {

  const {setUserInfo} = useAuthContext(); 
  const [response, setResponse] = useState("")
  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const [loginForm, setLoginForm] = useState({
      username: "",
      password: ""
    })



  async function loginUser(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()

      try { 
      const response = await fetchWithCSRF("/api/auth/get_token", {
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
        const errorResult = await response.json()
        setCount(prev => prev+1)
        throw new Error(`Error ${response.status}: ${errorResult.msg}`);
      }

      const result = await response.json();
      setResponse(result.msg);
      setCount(prev => prev +1)
      setUserInfo(result.username);
      navigate("/dashboard")
     
      
     
    } catch (error: unknown){
        if (error instanceof Error) {
              console.error('Error:', error.message);
              setResponse(error.message)
        } 
      
      };

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
           <div className="p-3" style={{textAlign: "center"}}>
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
          
          <div style= {{margin: "0 auto", display: "inline-flex"}}> 
          
          
          Not a member? Sign up  <Link className=" ml-1 underline  text-[var(--accent-clr)]"to="/register">
          <motion.div
       
whileHover={{
  scale: 1.05,
  y: -2,
  rotate: 1,
  transition: { 
    ease: [0.2, 0.5, 0.9, 0.7],
    duration: 0.2
  },
}}
whileTap={{
  scale: 0.98,
  rotate: -1,
  transition: { duration: 0.1 }
}}>
            here</motion.div>
          </Link> 
          

          </div>
          
          
     
           
    
             
        </form>
       
          <ErrorBox response= {response} count={count}/>
        
       
      </div>
    );
}

