import { useLoaderData } from "react-router";
import {useState} from "react"
import Console from "./Console.tsx"
import '../assets/styles/Consoles.css';
import EmptyCollection from "../general/EmptyCollection.tsx";



type GameConsole = {
  id: number;
  name: string;
  year: number;
}


function Consoles() {


  
  const loadedConsoles = useLoaderData().consoles as GameConsole[]
  const [selectedID, setSelectedID] = useState(-1)
  const [allConsoles, setAllConsoles] = useState(loadedConsoles)
 
  function filterConsole(filter_id: number) {

    if (filter_id == -1) { 
      setAllConsoles(loadedConsoles)
      setSelectedID(-1)
    }
    
    else {
    
    setSelectedID(filter_id)
    setAllConsoles(loadedConsoles.filter(console => console.id === filter_id));
    }

  

  }


 
  return (

  <div className= "h-[100%]">
  <h1 className="page-header">My Consoles</h1>

  
  {allConsoles && allConsoles.length > 0 ? (
    <div className={`console-shelf${selectedID !== -1 ? " active" : ""}`}>
    
      {allConsoles.map((console: GameConsole) => (


        
    
        <Console
          key={console.id}
          isActive = {console.id == selectedID}
          handleConsole= {filterConsole}
          console_id={console.id}
          console_name={console.name}
          console_year={console.year}
        />

 
    
      ))}
      
    </div>
  ) : (
    <EmptyCollection message="Consoles will appear once you add games to your collection." />
  )}
</div>

  )
  
}

export default Consoles;