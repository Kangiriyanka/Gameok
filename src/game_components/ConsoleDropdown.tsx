import React from "react";
import '../assets/styles/add_game.css';
import { useLoaderData } from "react-router";

type DropdownProps = {
  onConsoleSelect: (console: string) => void;
}

type ConsoleOption = string



function Dropdown({onConsoleSelect}: DropdownProps) {


const consoles = useLoaderData() 


// Get the consoles from the loader.
const handleConsoleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  onConsoleSelect(event.target.value);
}

const consoleOptions = consoles.map((console: ConsoleOption) =>
  <option key={console} value = {console}>{console}</option>)


 
   return (
    <select name="selectedConsole"  onChange={handleConsoleSelect}>

      <option key="default" value="">Select a console</option>
      {consoleOptions}

        
    </select>

 

    


   )
  
  }



  export default Dropdown;