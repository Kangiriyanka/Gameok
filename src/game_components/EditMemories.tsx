import React from "react";
import {useState} from 'react'
import { useNavigate, useParams, useLocation} from "react-router-dom";
import '../assets/styles/add-game.css';
import { fetchWithCSRF } from "../assets/scripts/csrf";
import Editor from "..//general/Editor.tsx"
import '@mdxeditor/editor/style.css'



function EditMemories() {

  
  const [response, setResponse] = useState("")
  const location = useLocation();
  const { edit_memories} = location.state;
  const [newMemories, setNewMemories] = useState(edit_memories)
  const { id, title } = useParams();
  console.log("Edited memories:" + newMemories)

  const navigate = useNavigate();

  
  type MemoryData = {
    memories: string;
  }
  
  

  async function sendDataToFlask(data: MemoryData) {

    const formData = new FormData();
    formData.append('memories', data.memories);

    try {

      const response = await fetchWithCSRF(`/api/collection/edit_game_memories/${id}/`, {
        method: 'POST',
        
        body: formData
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.json();
      setResponse(result.message);
      navigate(`/dashboard/games/${id}/${title}`);


    } catch (error: any) {
      console.error('Error:', error);
      setResponse("Error: " + error.message);

    }
 
  }

  function submitMemories(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: MemoryData = {
      "memories": newMemories,
    }

    sendDataToFlask(data)
  }

  
     

   
  return (

    <div className= "">
       <h1 className="page-header">Edit Memories of {title} </h1> 

      <form onSubmit= {submitMemories}>
      <Editor memories = {edit_memories} handleSubmit ={submitMemories} handleChange={setNewMemories}/>
       </form>
   
      
    </div>
  )

}

export default EditMemories;