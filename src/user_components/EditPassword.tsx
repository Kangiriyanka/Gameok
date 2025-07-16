
import {useState} from 'react'
import '../assets/styles/forms.css';
import { fetchWithCSRF } from '../assets/scripts/csrf';
import ErrorBox from '../animation_components/ErrorBox';


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
   
    setResponse(result);
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
      
      <button type="submit" className="form-button " >Edit</button>
      
    </form>

    <ErrorBox response = {response} count = {count}/>

    
    </div>
  )

}


