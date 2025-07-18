
import { useLoaderData} from "react-router";
import type {Game} from "../tables/columns"
import { columns,  } from "../tables/columns"
import { DataTable } from "../tables/data-table"
import EmptyCollection from "../general/EmptyCollection.tsx";



function Games() {


    const gameCollection = useLoaderData().games as Game[];
    
   
    return (
   
        <div className=" main-container">
         <div className="page-header">
           <h1> My Games</h1>
           
           
        </div>      



     <DataTable columns={columns} data={gameCollection} />
    </div>

 

 


    )
}


export default Games;