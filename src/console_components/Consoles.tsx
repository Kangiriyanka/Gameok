import { useLoaderData } from "react-router";
import Console from "./Console.tsx"
import './Consoles.css';



type GameConsole = {
  console_id: number;
  console_name: string;
}


function Consoles() {
  
  const allConsoles = useLoaderData() 
  return (
    <div className="console_shelf d-flex flex-column ">

        
        {allConsoles.map((console: GameConsole) =>
        <Console key={console.console_id} console_id={console.console_id} console_name={console.console_name} />)}

    </div>
  );
}

export default Consoles;