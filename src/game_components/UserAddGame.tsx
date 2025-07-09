
import {useState} from 'react'

import { useLoaderData } from 'react-router';
import { useAuthContext } from '../context/AuthContext.tsx';
import GameDropdown from "./GameDropdown.tsx"
import '../assets/styles/add_game.css';


type GameData = {
  title: string;
  memories: string;
}

function UserAddGame() {


    const [response, setResponse] = useState('')
    const [gameTitle, setGameTitle] = useState('')
    const [memories, setMemories] = useState('')
    const games = useLoaderData(); 
    const {token} = useAuthContext(); 
    


    const handleGameSelect = (value: string) => {
        setGameTitle(value);
      }

    async function sendDataToFlask(data: GameData) {

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('memories', data.memories);
    
    
        try {
          const response = await fetch("/user_add_game", {
            method: "POST",
            headers: {Authorization: 'Bearer ' + token},
            body: JSON.stringify(data)
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          setResponse(result)
          
        } catch (error) {
          console.error('Error:', error);
          setResponse("An error occurred while submitting the form.");
        }
         
      
    
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


        <div className= "d-flex flex-column justify-content-center">
        <form onSubmit={submitGame} className="d-flex flex-column game_form">
        <h1> Add a Game </h1>
       
     
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

      <button type="submit" className="form_button btn btn-dark">Add Game</button>
      <p> {response} </p>
      </form>

        

           
           
        </div>


    )
}


export default UserAddGame;