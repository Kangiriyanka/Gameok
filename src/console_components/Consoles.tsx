import { useLoaderData } from "react-router";
import Console from "./Console.tsx"
import '../assets/styles/Consoles.css';



type GameConsole = {
  console_id: number;
  console_name: string;
}


function Consoles() {
  
  const allConsoles = useLoaderData()
  console.log(allConsoles) 
  return (
    <div>

        <div className="page-header">
           <h1> My Consoles</h1>
           
        </div>      

        
        
        {allConsoles && allConsoles.map((console: GameConsole) =>
        <Console key={console.console_id} console_id={console.console_id} console_name={console.console_name} />)}

    </div>
  );
}

export default Consoles;