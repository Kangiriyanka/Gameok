import React from "react";
import {useState} from 'react'
import '../assets/styles/forms.css';
import ErrorBox from "../animation_components/ErrorBox";

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
  const [count, setCount] = useState(0)
  

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
      console.log(result)
      setResponse(result.msg);
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
      
    }

    sendDataToFlask(data)
  }

  // Form contains a text, email and password inputs
  // onChange propery  of those inputs will modify the state our username, email and password variables.

  return (
    <div className="">

      <div className="page-header" style= {{textAlign: "center"}}>
           <h1> Gameok Register </h1>
           
        </div> 
    <form onSubmit={submitUser} style= {{margin: "0 auto"}} className="reg-form">
    
      <label>
        Username:
        <input type="text" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
      </label>
      
      <button type="submit" className="form-button">Register </button>
     
    </form>

    <ErrorBox response={response} count={count}/>

    
    </div>
  )

}


