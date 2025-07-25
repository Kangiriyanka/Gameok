
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

import { fetchWithCSRF } from "../assets/scripts/csrf";
import { motion } from "motion/react";

type GameProps = {
    id: number;
    series: string;
    year: string;
    title: string;
    cover: string;
    console_name: string;

}



export default function GameCard({id, series, year, title, console_name}: GameProps) {

 
    const [isActive, setActive] = useState(true)
    const sizeMap = new Map()
    sizeMap.set("Nintendo 64", "small")
   
    


 

    



  async function deleteGame() {
    if (window.confirm("Are you sure you want to delete this game?")) {
      setActive(false);

      try {
        const response = await fetchWithCSRF(`/api/game/delete_game/${id}`, {
          method: 'DELETE',
        
        });
        // Axios handles the response automatically, but with fetch we need to check if the response is ok.
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
    

      } catch (error: any) {
        console.error(error);
     
      }
    }
}
    return (
    
      <div> 
      { isActive ? ( 

          <motion.div className= {`relative ${sizeMap.get(console_name) || "default"}-game-card border-1 w-30`}
           
      
          >
        
          <img src={`/api/game/fetch_cover/${title}/`} alt="Game cover" />
          <Link to={{pathname: `/game/${id}/${title}`}} 
        
          > {title}</Link>
          <p> {year}</p>
          <div>
          <button className="" onClick={deleteGame}> Delete</button>
          
        
          
      
          </div>
          </motion.div>

        
       ) : "" }
      </div>
      

    )
}

