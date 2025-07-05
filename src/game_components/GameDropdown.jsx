

import React from "react";
import {useState, useEffect} from 'react'
import axios from "axios";
import './AddGame.css';




function GameDropdown(props) {

const [games, setGames] = useState([]);


// Only make a GET request once 
useEffect(() => {
  async function fetchData() {
    axios({
      method: "GET",
      url:"/get_all_game_titles",
      headers: {
        Authorization: 'Bearer ' + props.token
      }

      
    })
      .then(response => {
        console.log(response.data);
        setGames(response.data)
      })
    
      .catch(error => {
            console.log(error.response)
      });
    
  }
  fetchData();
}, []);


const handleGameSelect = (event) => {
  props.onGameSelect(event.target.value);
}

const gameSelects = games.map((game) =>
  <option key={game} value = {game}>{game}</option>)
  

 
   return (


    <select name="selectedGame"  onChange={handleGameSelect}>

      <option key="default" value="">Select a game</option>
      {gameSelects}

        
    </select>

 

    


   )
  
  }



  export default GameDropdown;