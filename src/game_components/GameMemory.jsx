import React from "react";
import './Game.css';
import { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useParams} from "react-router-dom";


function GameMemory(props) {

    const [memories, setMemories] = useState([])
    const { game_id, title } = useParams();
    
   

  useEffect(() => {
    async function fetchMemories() {
      axios({
        method: "GET",
        url: `/get_game_memories/${game_id}/`,
        headers: {
          Authorization: 'Bearer ' + props.token
        }
  
        
      })
        .then(response => {
          const res= response.data
          console.log(response.data);
          setMemories(res)
          
        })
      
        .catch(error => {
              console.log(error.response)
        });
      
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