
import {useState} from 'react'
import GameCard from '../game_components/GameCard.tsx'
import '../assets/styles/consoles.css';
import { AnimatePresence, motion } from 'motion/react';
import { consoleVariants } from '@/assets/scripts/animations.ts';




type ConsoleProps = {
    console_id: number;
    console_name: string;
    console_year: number;
    isActive: boolean;
    handleConsole: (arg0: number) => void;
}

type ConsoleGame = {
    game_id: number;
    game_series: string;
    game_year: string;
    game_title: string;
    game_cover_photo: string;
}


function Console({isActive, handleConsole, console_id, console_name, console_year}: ConsoleProps) {

    const [consoleGames, setConsoleGames] = useState<ConsoleGame[]>([]);
    const [showGames, setShowGames] = useState(false)


    function resetConsoles() {
      setShowGames(false)
      handleConsole(-1)

    }


    async function getConsoleGames(console_id: ConsoleProps["console_id"]) {
       
      try {

        const response = await fetch(`/api/collection/get_console_games/${console_id}/`, {
          method: "GET",
          credentials: 'include'
        
        });

        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
       
        const result = await response.json();
        console.log(result)
        setConsoleGames(result.console_games);
        
          
  
        } catch(error)  {
            console.error('Error:', error);
        };
        
      }

      function toggleGames(console_id: number) {
        setShowGames(prev => !prev)
        getConsoleGames(console_id)
        handleConsole(console_id)

      }
 
    



    return (


        <AnimatePresence>
        <motion.div 
        key = {console_id}
        variants= {consoleVariants}
        initial="initial"
        animate="animate"
        whileHover= {!isActive ? "hover": ""} 
        exit= "exit"

        className={`console-container${isActive ? " active" : ""}`}
        >
           
          
           <div className="flex flex-col">
            
              <div className="console-information flex items-center gap-1">
               <button  className=" w-[100%]console-button" onClick= {() => toggleGames(console_id)}> 
                <p className=" console-name text-xl " >{console_name}</p>
                <p className= "console-year text-sm opacity-50">{console_year}</p>
              
              </button>

                {isActive ? 
                
                        <motion.div
                           
                        
                           whileHover = {{
                            scale:1.1,
                            x:2,
                           }}>
                          
                    <button onClick = {resetConsoles }>

                    <svg className= "fill-[var(--accent-clr)]"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z"/></svg>
                     </button>
                    </motion.div>

                : ""}
            </div>
       
            
            
        
            
            

           <div className= "game-collection"> 
           {consoleGames && showGames && consoleGames.map((consoleGame) =>
          
           <GameCard key={consoleGame.game_id} 
                 game_id= {consoleGame.game_id}  
                 game_series= {consoleGame.game_series} 
                 game_year = {consoleGame.game_year} 
                 game_title={consoleGame.game_title} 
                 game_cover= {consoleGame.game_cover_photo} 
              
                 
                 />)}
           
            </div>
            </div>


       
           
          
           
        </motion.div>
        </AnimatePresence>


    )
}


export default Console;