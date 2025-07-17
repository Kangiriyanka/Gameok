import React from "react";
import {useState} from 'react'
import { useNavigate, useParams, useLocation} from "react-router-dom";
import '../assets/styles/add_game.css';
import { fetchWithCSRF } from "../assets/scripts/csrf";
import Editor from "..//general/Editor.tsx"
import '@mdxeditor/editor/style.css'



function EditMemories() {

  
  const [response, setResponse] = useState("")
  const location = useLocation();
  const { edit_memories} = location.state;
  const [new_memories, setNewMemories] = useState(edit_memories)
  const { game_id, title } = useParams();

  const navigate = useNavigate();

  
  type MemoryData = {
    memories: string;
  }
  
  

  async function sendDataToFlask(data: MemoryData) {

    const formData = new FormData();
    formData.append('memories', data.memories);

    try {

      const response = await fetchWithCSRF(`/api/collection/edit_memory/${game_id}`, {
        method: 'POST',
        
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

    <div className= "">
       <h1 className="page-header">Edit Memories of {title} </h1> 

      <form>
      <Editor/>
      <button type="submit" className="form-button">Edit Memories</button>
       </form>
   
      
    </div>
  )

}

export default EditMemories;