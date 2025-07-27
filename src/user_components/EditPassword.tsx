
import {useState} from 'react'
import '../assets/styles/forms.css';
import { fetchWithCSRF } from '../assets/scripts/csrf';
import ErrorBox from '../animation_components/ErrorBox';
import { motion } from 'motion/react';


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
  const [count, setCount] = useState(0)




async function sendDataToFlask(data: PasswordData) {
  try {
    const response = await fetchWithCSRF('/api/auth/edit_password', {
      method: 'POST',
      headers: {
        
        "Content-Type": "application/json",
     
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
            const errorResult = await response.json()
            setCount(prev => prev +1)
            throw new Error(`Error ${response.status}: ${errorResult.msg}`);
    }

    const result = await response.json();
    setResponse(result.msg);
    setCount(prev => prev +1)
   
   
  } catch (error: unknown) {

     if (error instanceof Error) {
              
        console.error(error.message);
        setResponse(error.message)
    } 
    
 
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
    <div>
        <div className="page-header">
           <h1> Change Password</h1>
           
        </div>      
    <form onSubmit={submitUser} className="reg-form edit-password">
     
      <label>
       <span className="label-text"> Current Password</span>
        <input
          type="password"
          placeholder= "Your current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}/>
      </label>

      <label>
        <span className="label-text"> New Password</span>
        <input
          type="password"
             placeholder= "Your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}/>
      </label>

      <label>
         <span className="label-text"> Confirm  Password</span>
        <input
          type="password"
          value={confirmPassword}
          placeholder= "Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}/>
      </label>
      
     
         <motion.button  whileHover={{ scale: 1.05}}
     whileTap={{ scale: 0.95 }}
     transition= {{duration: 0.1}} type="submit" className="form-button " >Edit</motion.button>
      
    </form>

    <ErrorBox key={count} handleDismiss={() => setResponse('')} isCover = {false} response = {response} count= {count}/>
    

    
    </div>
  )

}


