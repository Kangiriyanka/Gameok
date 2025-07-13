
import {useState} from 'react'
import {motion} from "motion/react"
import { useAuthContext } from '../context/AuthContext';
import '../assets/styles/forms.css';


type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function EditPassword() {

  const [response, setResponse] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {token} = useAuthContext();



async function sendDataToFlask(data: PasswordData) {
  try {
    const response = await fetch('/api/auth/edit_password', {
      method: 'POST',
      headers: {
        
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token 
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result)
   
    setResponse(result);
  } catch (error: any) {

    console.log("Result" + error.msg)
    
 
  }
}
  

  function submitUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
   
    const data = {
    
      "currentPassword": currentPassword,
      "newPassword": newPassword,
      "confirmPassword": confirmPassword
      
    }
   
    sendDataToFlask(data)
  }

  // Form contains inputs for the current password, new password and confirmation of the new password
  return (
    <motion.div transition = {{delay: 1}}>
        <div className="page-header">
           <h1> Edit Password</h1>
           
        </div>      
    <form onSubmit={submitUser} className="reg-form">
     
      <label>
        Current Password
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}/>
      </label>

      <label>
        New Password
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}/>
      </label>

      <label>
        Confirm  Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}/>
      </label>
      
      <button type="submit" className="form-button" >Edit</button>
      <p> {response} </p>
    </form>

    
    </motion.div>
  )

}


