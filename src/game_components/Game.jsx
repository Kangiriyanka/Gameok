import React from "react";
import './Game.css';
import { Link } from "react-router-dom";
import { useState } from 'react'
import axios from "axios";


function Game(props) {

    
    const [response, setResponse] = useState("")
    const [isActive, setActive] = useState(true)
    const config = {
        headers: {
          Authorization: 'Bearer ' + props.token
          
        }
      };


    function deleteGame() {
      if (window.confirm("Are you sure you want to delete this game?")) {
      setActive(false)
        axios
        .delete(`/delete_game/${props.id}`, config)
        .then(response => {
          
          setResponse(response.data);
          
          
        })
        .catch(error => {
          console.log(error)
    });
  }
    }
    return (
    
      <div> 
      { isActive ? ( 

          <div  className= "gameCard d-flex flex-column  ">
        
          <img src={props.cover} alt="cover" />
          <Link  className="game_link" to={{pathname: `/game/${props.id}/${props.title}`}} 
        
          > {props.title}</Link>
          <p> {props.year}</p>
          <div>
          <button class=" delete_button btn btn-dark" onClick={deleteGame}> Delete</button>
          
        
          
          {props.storedUserInfo == "Kangiriyanka" ?
          (<Link  className="game_link btn btn-dark" to={{pathname: `/game/edit/${props.id}/${props.series}/${props.title}/${props.year}`}} >
                  Edit
              
          </Link>) : "" }
          </div>
          </div>

        
       ) : "" }
      </div>
      

    )
}


export default Game;