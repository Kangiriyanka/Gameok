import React from "react";
import {useState} from 'react'
import axios from "axios";
import GameDropdown from "./GameDropdown.jsx"
import { useNavigate } from "react-router-dom";
import './AddGame.css';


function UserAddGame(props) {


    const [response, setResponse] = useState('')
    const [gameTitle, setGameTitle] = useState('')
    const [memories, setMemories] = useState('')


    const navigate = useNavigate();


    const config = {
      headers: {
        'Content-Type':  'multipart/form-data',
        'Access-Control-Allow-Origin': '*', // Set the Content-Type header to application/json
        Authorization: 'Bearer ' + props.token
       
      }
    };

    const handleGameSelect = (value) => {
        setGameTitle(value);
      }

    function sendDataToFlask(data) {

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('memories', data.memories);
    
    
        axios
          .post('/user_add_game', formData, config)
          .then(response => {
            setResponse(response.data);
            
          })
          .catch(error => {
            console.log(error)
      });
    
      }
    
    
     
      
    
      function submitGame(e) {
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
            {/* <Dropdown onConsoleSelect={handleConsoleSelect} token={props.token}/> */}
            <GameDropdown onGameSelect={handleGameSelect} token={props.token}/>
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