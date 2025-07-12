
import { useLoaderData } from "react-router";
import Game from "./Game.tsx"



type Game = {
    game_id: number;
    game_series: string;
    game_year: string;
    game_title: string;
    game_cover: string;

}

function Games() {


    const gameCollection = useLoaderData().games as Game[];
    return (
        <div className=" ">
         <div className="page-header">
           <h1> My Games</h1>
           
        </div>      
        { gameCollection && gameCollection.map((game: Game) =>
    
    <Game key={game.game_id} 
          game_id= {game.game_id}  
          game_title= {game.game_title} 
          game_year= {game.game_year}  
          game_series= {game.game_series}  
          game_cover={game.game_cover}/>
    )}
  
        </div>


    )
}


export default Games;