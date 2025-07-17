
import { useLoaderData, Outlet} from "react-router";
import GameCard from "./GameCard.tsx"
import EmptyCollection from "../general/EmptyCollection.tsx";



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



        
        { gameCollection && gameCollection.length > 0 ? (
            gameCollection.map((game: Game) =>
              
    
    <GameCard key={game.id} 
          game_id= {game.id}  
          game_title= {game.title} 
          game_year= {game.year}  
          game_series= {game.series}  
          game_cover={game.cover}/>
  
    )) : 

    (
       <EmptyCollection message="You currently have no games in your collection."/>
    )
     }

 

    
    </div>



    )
}


export default Games;