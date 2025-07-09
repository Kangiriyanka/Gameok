
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


    const gameCollection = useLoaderData() as Game[];
    return (
        <div className="games d-flex flex-column">
        <h2>My Collection</h2>
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