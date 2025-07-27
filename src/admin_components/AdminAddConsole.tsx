import React from "react";
import {useState} from 'react'
import "./AddConsole.css"
import ErrorBox from "../animation_components/ErrorBox";
import { fetchWithCSRF } from "../assets/scripts/csrf";
import { motion } from "motion/react";

// Parsed in the backend as an integer, but kept as a string here.
type ConsoleData = {
  name: string,
  firm: string,
  year: string,
}
function AddConsole() {

  const [response, setResponse] = useState("")
  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [year, setYear] = useState("")
  const [count, setCount] = useState(0)
  




  async function sendDataToFlask(data: ConsoleData ) {

    try {
      const response = await fetchWithCSRF("/api/admin/add_console", {
        method: "POST",
        headers:  {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(data)
      });
      
        if (!response.ok) {
        const errorResult = await response.json()
        setCount(prev => prev +1)
        throw new Error(`Error ${response.status}: ${errorResult.msg}`);
      }


      const result = await response.json();
      setResponse(result.msg);
      setCount(prev => prev +1)
      

    } catch (error: unknown){
        if (error instanceof Error) {
              console.error('Error:', error.message);
              setResponse(error.message)
        } 
      
      };
    }
  

  function submitConsole(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      "name": name,
      "firm": firm,
      "year": year,

    }

    sendDataToFlask(data)
  }

  return (
    <div className="" >

       <div className="page-header">
          
            <h1>Add Consoles</h1> 

      
           
        </div>      
    
    <form onSubmit={submitConsole} className="reg-form admin-form">
  
      <label>
        <span className="label-text">Title</span> 
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      </label>
      <label>
             <span className="label-text">Year</span> 
        <input
          type="number"
          value={year}
          min="1972"
          max={new Date().getFullYear()}
          onChange={(e) => setYear(e.target.value)}/>
      </label>
      <label>
            <span className="label-text">Firm</span> 
        <input type="text" value={firm} onChange={(e) => setFirm(e.target.value)}/>
      </label>
      
      <motion.button  whileHover={{ scale: 1.05}}
     whileTap={{ scale: 0.95 }}
     transition= {{duration: 0.1}} type="submit" className="form-button" >Add Console</motion.button>
      
    </form>

    <ErrorBox  key={count} handleDismiss={() => setResponse('')} isCover={false} response= {response} count={count}/>
    
    
  

    
    </div>
  )

}

export default AddConsole;