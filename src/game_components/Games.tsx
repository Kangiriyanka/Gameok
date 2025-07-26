
import { useLoaderData} from "react-router";
import type {Game} from "../tables/columns"
import { columns,  } from "../tables/columns"
import { DataTable } from "../tables/data-table"
import { useState } from "react";
import { fetchWithCSRF } from "../assets/scripts/csrf";
import { filter } from "@mdxeditor/editor";
import { pageTransition } from "@/assets/scripts/animations";
import { motion } from "motion/react";


function Games() {


    const gameCollection = useLoaderData().games as Game[];
    const [collection, setCollection] = useState(gameCollection)



    async function deleteGame(id: number, game_title: string)  {

        try { 

      if (window.confirm(`Are you sure you want to delete ${game_title}?`)) {
        const response = await fetchWithCSRF(`/api/game/delete/${id}/`, {
          method: "DELETE"
        });

       

        if (!response.ok) {
        console.error("HTTP error status:", response.status);
        
       

        
      }



      setCollection(prev => prev.filter(game => game.id !== id));

      


        }

      } catch (error) {
      console.error("Fetch error:", error);
      }
 




        
      }
    
    
   
    return (
   
        <motion.div 

          key = {location.pathname}
            variants= {pageTransition}
            initial="initial"
            animate= "animate"
            exit="exit"
        
        className=" main-container">
         <div className="page-header">
           <h1> My Games</h1>
           
           
        </div>      



     <DataTable columns={columns(deleteGame)} data={collection} />
    </motion.div>

 

 


    )
}


export default Games;

