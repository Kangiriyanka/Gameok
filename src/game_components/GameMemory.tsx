import '../assets/styles/game.css';
import { useState, useEffect } from 'react'
import { Link, useParams} from "react-router-dom";



function GameMemory() {

    const [memories, setMemories] = useState([])
    const { game_id, title } = useParams();
    
    
   

 useEffect(() => {
  async function fetchMemories() {
    try {
      const response = await fetch(`/api/collection/get_game_memories/${game_id}/`, {
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
        <div className= "">
          
           <h1>{title}</h1>
           <p > {memories}</p>
           
           <Link  className="game_link" to={{pathname: `/dashboard/games/edit-memory/${game_id}/${title}`}} 
           state= {{edit_memories: memories}} 
     
        > Edit Memories</Link>
           
           
        </div>


    )
}


export default GameMemory;