import React from "react";
import {useState} from 'react'
import {motion} from "motion/react"
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";
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

    <div className= "page-header">
       <div className= "flex items-center gap-3">
       <h1 className="flex items-center">Edit Memories of {title} </h1> 
       <motion.div 

       whileHover = {{
        scale:1.1,
        x:2,
       }}
       >

      <Link to={{pathname: `/dashboard/games/${id}/${title}`}}> 

      <svg className= "fill-[var(--accent-clr)]"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z"/></svg>
      
       </Link>
       </motion.div>

      </div>
      <form onSubmit= {submitMemories}>
      <Editor title ={title ?? "" } memories = {edit_memories} handleSubmit ={submitMemories} handleChange={setNewMemories}/>
       </form>
   
      
    </div>
  )

}

export default EditMemories;