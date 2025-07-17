
import {useState} from 'react'
import Game from '../game_components/GameCard.tsx'
import '../assets/styles/consoles.css';




type ConsoleProps = {
    console_id: number;
    console_name: string;
    console_year: number;
}

type ConsoleGame = {
    game_id: number;
    game_series: string;
    game_year: string;
    game_title: string;
    game_cover_photo: string;
}


function Console({console_id, console_name, console_year}: ConsoleProps) {

    const [consoleGames, setConsoleGames] = useState<ConsoleGame[]>([]);
    const [showGames, setShowGames] = useState(false)


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
      }
 
    



    return (
        <div className="console-container">
           
          
           <div className= "">

           <button  className="" onClick= {() => toggleGames(console_id)}> 
         
            <p >{console_name}</p>
            <p className= "text-base opacity-50">{console_year}</p>
        
            
            </button>
           {consoleGames && showGames && consoleGames.map((consoleGame) =>
          
           <Game key={consoleGame.game_id} 
                 game_id= {consoleGame.game_id}  
                 game_series= {consoleGame.game_series} 
                 game_year = {consoleGame.game_year} 
                 game_title={consoleGame.game_title} 
                 game_cover= {consoleGame.game_cover_photo} 
              
                 
                 />)}
           
            </div>


       
           
          
           
        </div>


    )
}


export default Console;