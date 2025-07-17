
import { useLoaderData} from "react-router";

import EmptyCollection from "../general/EmptyCollection.tsx";
import GameListItem from "./GameListItem.tsx";



type Game = {
    id: number;
    series: string;
    year: string;
    title: string;
    cover: string;

}

function Games() {


    const gameCollection = useLoaderData().games as Game[];
    
   
    return (
   
        <div className=" main-container">
         <div className="page-header">
           <h1> My Games</h1>
           
           
        </div>      



     <ul className= "game-list">

        <div className="flex"> 
         
        </div> 
        { gameCollection && gameCollection.length > 0 ? (
            gameCollection.map((game: Game) =>

  
   
              
  
    <GameListItem key={game.id} 
          game_id= {game.id}  
          game_title= {game.title} 
          game_year= {game.year}  
          game_series= {game.series}  
         />
  
  
    )) : 

    (
       <EmptyCollection message="You currently have no games in your collection."/>
    )
     }
    </ul>

 

    
    </div>



    )
}


export default Games;