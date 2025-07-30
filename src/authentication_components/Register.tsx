import React from "react";
import {useState} from 'react'
import '../assets/styles/forms.css';
import ErrorBox from "../animation_components/ErrorBox";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";

type UserData = {
    username: string;
    email: string;
    password: string;
}

export default function Register() {

  // A user has a username, an email and a password. 
  const [response, setResponse] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  

  // Post to the add_user route in the database, the JSON.stringify turns the Javascript data to JSON.
  // 2-step process where the user click event calls the submitUser function which then calls sendDataToFlask. 


  async function sendDataToFlask(data: UserData) {
   try {
      const response = await fetch('/api/auth/add_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), 
      });
    
      if (!response.ok) {
        const errorResult = await response.json()
        setCount(prev => prev+1)
        throw new Error(`Error ${response.status}: ${errorResult.msg}`);
      }
      
      const result = await response.json();
   
      setResponse(result.msg);
      if (response.status == 200) navigate("/")
      setCount(prev => prev +1)

  }  catch (error: unknown){
        if (error instanceof Error) {
              console.error('Error:', error.message);
              setResponse(error.message)
        } 
      
      };
    }
  

  
// Data is a Javascript Object of the user information
  function submitUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      "username": username,
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword
      
    }

    sendDataToFlask(data)
  }

  // Form contains a text, email and password inputs
  // onChange propery  of those inputs will modify the state our username, email and password variables.

  return (
      <div>
             <div className="authentication-box" >
           <h1 className="mt-3"> Register </h1>
           
          </div> 
    <form onSubmit={submitUser} style= {{margin: "0 auto"}} className="reg-form">
    
      <label>
                <span className="label-text">Username</span>
        <input type="text" 
          placeholder="Your username" 
        value={username} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
      </label>
      <label>
        <span className="label-text">Email</span>
        <input 
        type="email" 
        value={email} 
         placeholder="Your email address" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
      </label>
      <label>
        <span className="label-text">Password</span>
        <input
          type="password"
          value={password}
          placeholder="Your password" 
          onChange={(e) => setPassword(e.target.value)}/>
      </label>

        <label>
         <span className="label-text"> Confirmation</span>
        <input
          type="password"
          value={confirmPassword}
          placeholder= "Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}/>
      </label>
      
       <motion.button  whileHover={{ scale: 1.05}}
     whileTap={{ scale: 0.95 }}
     transition= {{duration: 0.1}} type="submit" className="form-button">Register </motion.button>
     

       <div style= {{margin: "0 auto", display: "inline-flex"}}> 
          
          
          Already a  member? Login   <Link className=" ml-1 underline  text-[var(--accent-clr)]"to="/">
          <motion.div
       
>
            here.</motion.div>
          </Link> 
          

          </div>
    </form>

     <div className="flex justify-center ">
    <ErrorBox  key={count} handleDismiss={() => setResponse('')} isCover={false} response= {response} count={count}/>
    </div>

    
    </div>
  )

}


