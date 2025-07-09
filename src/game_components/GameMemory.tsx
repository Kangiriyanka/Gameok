import '../assets/styles/game.css';
import { useState, useEffect } from 'react'
import { Link, useParams} from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.tsx";


function GameMemory() {

    const [memories, setMemories] = useState([])
    const { game_id, title } = useParams();
    const {token} = useAuthContext();
    
   

 useEffect(() => {
  async function fetchMemories() {
    try {
      const response = await fetch(`/get_game_memories/${game_id}/`, {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      setMemories(res);

    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  fetchMemories();
}, []);

    
    return (
        <div className= "memory_fragment ">
           <h1>{title}</h1>
           <p > {memories}</p>
           
           <Link  className="game_link" to={{pathname: `/game/edit_memory/${game_id}/${title}`}} 
           state= {{edit_memories: memories}} 
     
        > Edit Memories</Link>
           
           
        </div>


    )
}


export default GameMemory;