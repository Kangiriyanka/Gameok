
import {useState} from 'react'
import Game from '../game_components/Game.tsx'
import { useAuthContext } from '../context/AuthContext'
import '../assets/styles/consoles.css';

type ConsoleProps = {
    console_id: number;
    console_name: string;
}

type ConsoleGame = {
    game_id: number;
    game_series: string;
    game_year: string;
    game_title: string;
    game_cover_photo: string;
}


function Console({console_id, console_name}: ConsoleProps) {
    const {token} = useAuthContext() 
    const [consoleGames, setConsoleGames] = useState<ConsoleGame[]>([]);


    async function getConsoleGames(console_id: ConsoleProps["console_id"]) {
       
      try {
        const response = await fetch("/api/collection/get_console_games/" + console_id, {
          method: "GET",
           headers: {
            Authorization: 'Bearer ' + token
          }});

        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
       
        const result = await response.json();
        setConsoleGames(result.data.console_games);
        
          
  
        } catch(error)  {
            console.error('Error:', error);
        };
        
      }

    



    return (
        <div className="d-flex flex-column">
           
          
           <div className= " console_box d-flex flex-row">
           <button className="btn btn-dark console_button" onClick= {() => getConsoleGames(console_id)}> {console_name}</button>
           {consoleGames && consoleGames.map((consoleGame) =>
          
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