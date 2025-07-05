import React from "react";
import {useState, useEffect} from 'react'
import axios from "axios";
import Game from "./Game.jsx"


function Games(props) {


    const [games, setGames] = useState([])

    useEffect(() => {
      async function fetchGames() {
        axios({
          method: "GET",
          url:"/get_games",
          headers: {
            Authorization: 'Bearer ' + props.token
          }
    
          
        })
          .then(response => {
            const res= response.data
            console.log(response.data);
            setGames(res["games"])
            console.log(games)
          })
        
          .catch(error => {
                console.log(error.response)
          });
        
      }
      fetchGames();
    }, []);

   
    return (
        <div className="games d-flex flex-column">
        <h2>My Collection</h2>
        { games && games.map((game) =>
    
    <Game  key={game.id} id= {game.id}  title= {game.title} year= {game.year}  series= {game.series}  cover={game.cover_photo} storedUserInfo={props.storedUserInfo} token={props.token}/>
    )}
  
        

        

        
        </div>


    )
}


export default Games;