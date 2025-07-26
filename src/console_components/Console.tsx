
import {useEffect, useState} from 'react'
import GameCard from '../game_components/GameCard.tsx'
import '../assets/styles/consoles.css';
import { AnimatePresence, motion } from 'motion/react';
import { consoleVariants, containerVariants, gameContainerVariants } from '@/assets/scripts/animations.ts';




type ConsoleProps = {
    console_id: number;
    console_name: string;
    console_year: number;
    isActive: boolean;
    handleConsole: (arg0: number) => void;
}

type ConsoleGame = {
    id: number;
    series: string;
    year: string;
    title: string;
    cover_photo: string;
}


function Console({isActive, handleConsole, console_id, console_name, console_year}: ConsoleProps) {

    const [consoleGames, setConsoleGames] = useState<ConsoleGame[]>([]);
    const [showGames, setShowGames] = useState(false)
    const [currentID, setCurrentID] = useState(-1)

 useEffect(() => {
  if (isActive && consoleGames.length === 0) {
    getConsoleGames(console_id);
  }
}, []);


    


    function resetConsoles() {
      setShowGames(false)
      handleConsole(-1)


    }

  
    async function getConsoleGames(console_id: number) {
       
      try {

        const response = await fetch(`/api/collection/get_console_games/${console_id}/`, {
          method: "GET",
          credentials: 'include'
        
        });

        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
       
        const result = await response.json();
     
        const newGames = result.console_games
        setConsoleGames(newGames); 
        setShowGames(true);
        setCurrentID(console_id)
        handleConsole(console_id)
   
       
      
          
  
        } catch(error)  {
            console.error('Error:', error);
        };
        
      }

      function toggleGames(console_id: number) {
  if (isActive) {
 
    return
  }
  
  getConsoleGames(console_id)
}
 
    



    return (


       
        <motion.div 
        layout
        key = {console_id}
        variants= {consoleVariants}
        onClick= {() => toggleGames(console_id)}
     


       whileHover={!isActive ? { scale: 1.10}: ""}
     whileTap={!isActive ? { scale: 0.95 }: ""}
transition={{
  duration: 0.2,

}}
      
      

        className={`console-container${isActive ? " active" : ""}`}
        >
           
          
           <div className="overflow-auto">
            
              <div className="console-information flex  mb-2 items-end gap-1">
               <button  className=" w-[100%] console-button" > 
                <p className=" console-name text-xl " >{console_name}</p>
                <p className= "console-year text-sm opacity-50">{console_year}</p>
              
              </button>
              

                {isActive ? 
                
                        <motion.div
                           
                        
                           whileHover = {{
                            scale:1.1,
                            x:-2 ,
                           }}>
                          
                    <button onClick = {resetConsoles}>

                    <svg className= "mr-5 w-8 h-8 fill-[var(--accent-clr)]" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z"/></svg>
                     </button>
                    </motion.div>

                : ""}
            </div>


            {isActive ? <hr className ="p-2 border-[var(--n64-gray-clr)]" /> : ""}
       
            
            
        
            
            

           <motion.div 
           key = {currentID}
           className= "game-collection"
           variants = {gameContainerVariants}
           initial = "initial"
           animate = "animate"
    
        
           
           > 
           {consoleGames && showGames && consoleGames.map((consoleGame) => 
          
           <GameCard 
                 key={consoleGame.id} 
                 id= {consoleGame.id}  
                 series= {consoleGame.series} 
                 year = {consoleGame.year} 
                 title={consoleGame.title} 
                 cover= {consoleGame.cover_photo} 
                 console_name = {console_name}
              
                 
                 />)}
           
            </motion.div>
            </div>


       
           
          
           
        </motion.div>
     
      


    )
}


export default Console;