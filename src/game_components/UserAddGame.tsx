
import {useState} from 'react'
import { useLoaderData } from 'react-router';
import '../assets/styles/add_game.css';
import { fetchWithCSRF } from '../assets/scripts/csrf.ts';
import ErrorBox from '../animation_components/ErrorBox.tsx';
import ConsoleOption from './ConsoleOption.tsx';
import { select } from 'motion/react-client';
import GameOption from './GameOption.tsx';


type GameData = {
  gameTitle: string;
}

function UserAddGame() {

    const game_consoles = useLoaderData(); 
  
    const [response, setResponse] = useState('')
    const [count, setCount] = useState(0)
    const [consoles, setConsoles] = useState(Object.keys(game_consoles))
    const [isConsoleSelected, setIsConsoleSelected] = useState(false);
    const [isGameSelected, setIsGameSelected] = useState(false)
    const [filteredGames, setFilteredGames] = useState([])
    const [selectedConsole, setSelectedConsole] = useState('')
    const [selectedGame, setSelectedGame] = useState('')
   
   
    
    async function sendDataToFlask() {

        const formData = new FormData();
        formData.append('title', selectedGame);
    
    
    
        try {
          const response = await fetchWithCSRF("/api/game/user_add_game", {
            method: "POST",
            body: formData,
          
          });

          if (!response.ok) {
            const errorResult = await response.json()
            setCount(prev => prev +1)
            throw new Error(`Error ${response.status}: ${errorResult.msg}`);
          }

          const result = await response.json();
 
          setResponse(result.msg);
          setCount(prev => prev +1)
          
        } catch (error: unknown){
          if (error instanceof Error) {
              
              console.error(error.message);
              setResponse(error.message)
        } 
      
      };
         
      
    
      }
    
    

      const filterGames = (console_name: string) => {

    
        setSelectedConsole(console_name)
        setSelectedGame("")
        setIsConsoleSelected(prev => !prev)
        setFilteredGames(game_consoles[console_name])
        
      }

      const selectGame = (game_title: string) => {
        setSelectedGame(game_title)
        setIsGameSelected(prev =>!prev)
      }
   

    return (


        <div className= "">
           <div className="page-header">
           <h1> Add Games</h1>
           
        </div>  
        
         
        <div className="mt-5 relative top-8 left-12" >
        <h2 > Select a console</h2>

        <div className= "console-selector">
              
         {consoles && consoles.map((console: string) => (
          <ConsoleOption onConsoleSelect= {filterGames} name={console}/>

          
  
))}
</div>
  <div className="mt-8" >
  <h2 > Select a game</h2>
  <div className= "game-selector">
    
              
         {filteredGames && filteredGames.map((console: string) => (
          <GameOption onGameSelect= {selectGame} name={console}/>

          
  
))}
</div>
</div>
</div>


       
     
      {isConsoleSelected && isGameSelected &&   (
      <button type="submit"  onClick ={sendDataToFlask} className="form-button">Add Game</button>
    )
  }
    

      <ErrorBox response = {response} count= {count}/>

        

           
           
        </div>


    )
}


export default UserAddGame;