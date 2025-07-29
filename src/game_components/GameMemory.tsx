import '../assets/styles/game.css';
import '../assets/styles/memories.css';
import { useState, useEffect } from 'react'
import { Link, useParams} from "react-router-dom";
import {motion} from "motion/react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



function GameMemory() {

    const [memories, setMemories] = useState("")
    const { id, title } = useParams();
   

 useEffect(() => {
  async function fetchMemories() {
     console.log("Game ID: " + id)
      console.log("Title: " + title)
    try {
      const response = await fetch(`/api/collection/get_game_memories/${id}/`, {
        method: "GET",
        credentials: "include",
       
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMemories(result.msg);

    }  catch (error: unknown){
          if (error instanceof Error) {
              
              console.error(error.message);
              
        } 
      
      };
         
  }

  fetchMemories();
}, []);

    
    return (
        <div className= "page-header">
          
           <div className= "flex items-center gap-3">
           <h1 className="flex items-center"> 
            Memories of {title} </h1> 
            <motion.div
            
            whileHover = {{
              scale: 1.1,
              x: 2,
             
              
             
            }}
            >
             <Link   to={{pathname: `/dashboard/games/edit-memory/${id}/${title}/`}} 
           state= {{edit_memories: memories}}>

       
             <svg className= "fill-[var(--accent-clr)]" xmlns="http://www.w3.org/2000/svg" 
             height="24px" viewBox="0 -960 960 960" 
             width="24px" fill="#e3e3e3">
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>

            </Link>
            </motion.div>

            </div>

            <article className="memory-article">

            {memories ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              
              {memories}
            </ReactMarkdown>

            ) : <p className="text-xl"> No memories added yet. </p>}
                          
              



           </article>
     
        </div>


    )
}


export default GameMemory;