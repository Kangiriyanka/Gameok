import React from "react";
import {useState} from 'react'
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import '../assets/styles/add_game.css';



function EditMemories() {

  
  const [response, setResponse] = useState("")
  const location = useLocation();
  const { edit_memories} = location.state;
  const [new_memories, setNewMemories] = useState(edit_memories)
  const { game_id, title } = useParams();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  
  type MemoryData = {
    memories: string;
  }
  
  

  async function sendDataToFlask(data: MemoryData) {

    const formData = new FormData();
    formData.append('memories', data.memories);

    try {

      const response = await fetch(`/api/collection/edit_memory/${game_id}`, {
        method: 'POST',
        headers: {  
            Authorization: 'Bearer ' + token
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.json();
      setResponse(result.message);
      navigate('/games');


    } catch (error: any) {
      console.error('Error:', error);
      setResponse("Error: " + error.message);

    }
 
  }

  function submitMemories(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: MemoryData = {
      "memories": new_memories,
    }

    sendDataToFlask(data)
  }

  
     

   
  return (
    <div className= "d-flex flex-column justify-content-center">
    
    
 
    <form  onSubmit={submitMemories} className="d-flex flex-column game_form">
    <h3> Edit Memories for  {title} </h3>
    
      <label>
        Memories:
        <input
          type="textarea"
          value={new_memories}
          onChange={(e) => setNewMemories(e.target.value)}/>
      </label>

      
      <button type="submit" className="form_button btn btn-dark">Edit Memories</button>
      <p> {response} </p>
    </form>
      
    </div>
  )

}

export default EditMemories;