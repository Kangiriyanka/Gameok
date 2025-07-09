
import {useState} from 'react'
import { useAuthContext } from '../context/AuthContext';
import '../assets/styles/user_components.css';

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
    const response = await fetch('/edit_password', {
      method: 'POST',
      headers: {
       
        Authorization: 'Bearer ' + token 
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    setResponse(result);
  } catch (error) {
    console.error(error);
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
    <div className="d-flex flex-column justify-content-center">
    <form onSubmit={submitUser} className=" d-flex flex-column reg_form">
      <h1> Change your Password</h1>
      <label>
        Current Password:
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}/>
      </label>

      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}/>
      </label>

      <label>
        Confirm New Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}/>
      </label>
      
      <button type="submit" className=" btn btn-dark form_button" >Register User</button>
      <p> {response} </p>
    </form>

    
    </div>
  )

}


