import { useLoaderData } from "react-router";
import Console from "./Console.tsx"
import '../assets/styles/Consoles.css';
import EmptyCollection from "../general/EmptyCollection.tsx";
import { motion } from "motion/react";


type GameConsole = {
  id: number;
  name: string;
  year: number;
}


function Consoles() {
  
  const allConsoles = useLoaderData().consoles as GameConsole[]
  console.log(allConsoles)


 
  return (

    <div>
  <h1 className="page-header">My Consoles</h1>

  <div className="relative top-12 left-12">
  {allConsoles && allConsoles.length > 0 ? (
    <div className="console-shelf">
      {allConsoles.map((console: GameConsole) => (

        <motion.div   
        whileHover = {{scale: 1.1}}>
        
        <Console
          key={console.id}
          console_id={console.id}
          console_name={console.name}
          console_year={console.year}
        />
        </motion.div>
      ))}
    </div>
  ) : (
    <EmptyCollection message="Consoles will appear once you add games to your collection." />
  )}
</div>
</div>
  )
  
}

export default Consoles;