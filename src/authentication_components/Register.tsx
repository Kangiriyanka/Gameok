import React from "react";
import {useState} from 'react'
import '../assets/styles/user_components.css';

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
  

  // Post to the add_user route in the database, the JSON.stringify turns the Javascript data to JSON.
  // 2-step process where the user click event calls the submitUser function which then calls sendDataToFlask. 


  async function sendDataToFlask(data: UserData) {
   try {
      const response = await fetch('/user/add_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), 
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setResponse(result.data);

  }   catch (error) {
        console.error('Error:', error);
        setResponse("An error occurred while submitting the form.");
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
    <div className="d-flex flex-column justify-content-center">
    <form onSubmit={submitUser} className=" d-flex flex-column reg_form">
      <h1> Register Now</h1>
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
      
      <button type="submit" className=" btn btn-dark form_button" >Register User</button>
      <p> {response} </p>
    </form>

    
    </div>
  )

}


