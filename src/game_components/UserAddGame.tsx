
import {useState} from 'react'

import { useLoaderData } from 'react-router';
import GameDropdown from "./GameDropdown.tsx"
import '../assets/styles/add_game.css';
import { fetchWithCSRF } from '../assets/scripts/csrf.ts';
import ErrorBox from '../animation_components/ErrorBox.tsx';


type GameData = {
  title: string;
  memories: string;
}

function UserAddGame() {


    const [response, setResponse] = useState('')
    const [gameTitle, setGameTitle] = useState('')
    const [memories, setMemories] = useState('')
    const [count, setCount] = useState(0)
    const games = useLoaderData(); 
   
    


    const handleGameSelect = (value: string) => {
        setGameTitle(value);
      }

    async function sendDataToFlask(data: GameData) {

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('memories', data.memories);
    
    
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
    
    
      function submitGame(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        const data = {
          "title": gameTitle,
          "memories": memories,
          
        }
    
        sendDataToFlask(data)
      }

    return (


        <div className= "">
           <div className="page-header">
           <h1> Add Games</h1>
           
        </div>  
        <form onSubmit={submitGame} className="reg-form">
       
       
     
        <label>
            Game:
            <GameDropdown onGameSelect={handleGameSelect} games ={games}/>
        </label>
       
        <label>
        Memories:
        <input
          type="textarea"
          value={memories}
          onChange={(e) => setMemories(e.target.value)}/>
      </label>

      <button type="submit" className="form-button">Add Game</button>
      
      </form>

      <ErrorBox response = {response} count= {count}/>

        

           
           
        </div>


    )
}


export default UserAddGame;