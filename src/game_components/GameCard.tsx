
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

import { fetchWithCSRF } from "../assets/scripts/csrf";
import { motion } from "motion/react";
import { consoleVariants, gameVariants } from "@/assets/scripts/animations";

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
    
      <motion.div
        variants= {gameVariants}
        whileTap={{ scale: 0.95 }}
    
     
      >
      { isActive ? ( 

          <motion.div 
          className= {`relative ${sizeMap.get(console_name) || "default"}-game-card border-2 border-[var(--n64-gray-clr)] card  `}
          
         
      
          >
          <Link  to={`/dashboard/games/${id}/${title}`}>

          <img src={`/api/game/fetch_cover/${title}/`} alt="Game cover" />

          <div className="card-content">
                <h3> {title} </h3>
                <p> {year}</p>
               

        
          
          
      
          </div>
          </Link>
          </motion.div>

        
       ) : "" }
      </motion.div>
      

    )
}

