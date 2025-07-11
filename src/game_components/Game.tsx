
import { Link } from "react-router-dom";
import { useState } from 'react'
import { useAuthContext } from "../context/AuthContext";

type GameProps = {
    game_id: number;
    game_series: string;
    game_year: string;
    game_title: string;
    game_cover: string;

}

export default function Game({game_id,game_series, game_year, game_title, game_cover}: GameProps) {

    const [response, setResponse] = useState("")
    const [isActive, setActive] = useState(true)
    const {token, storedUserInfo} = useAuthContext()



  async function deleteGame() {
    if (window.confirm("Are you sure you want to delete this game?")) {
      setActive(false);

      try {
        const response = await fetch(`/api/game/delete_game/${game_id}`, {
          method: 'DELETE',
          headers: {
             Authorization: 'Bearer ' + token
          },
        });
        // Axios handles the response automatically, but with fetch we need to check if the response is ok.
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResponse(data);

      } catch (error: any) {
        console.error(error);
        setResponse("Error: " + error.message);
      }
    }
}
    return (
    
      <div> 
      { isActive ? ( 

          <div  className= "gameCard d-flex flex-column  ">
        
          <img src={game_cover} alt="cover" />
          <Link  className="game_link" to={{pathname: `/game/${game_id}/${game_title}`}} 
        
          > {game_title}</Link>
          <p> {game_year}</p>
          <div>
          <button className=" delete_button btn btn-dark" onClick={deleteGame}> Delete</button>
          
        
          
          {storedUserInfo == "Kangiriyanka" ?
          (<Link  className="game_link btn btn-dark" to={{pathname: `/game/edit/${game_id}/${game_series}/${game_title}/${game_year}`}} >
                  Edit
              
          </Link>) : "" }
          </div>
          </div>

        
       ) : "" }
      </div>
      

    )
}

