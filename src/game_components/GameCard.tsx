
import { Link } from "react-router-dom";
import { useState} from 'react'

import { motion } from "motion/react";
import { gameVariants } from "@/assets/scripts/animations";

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
    // Uploading images of different sizes.
    sizeMap.set("Nintendo 64", "small")
   


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

