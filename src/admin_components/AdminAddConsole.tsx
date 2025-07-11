import React from "react";
import {useState} from 'react'
import { useAuthContext } from '../context/AuthContext'
import "./AddConsole.css"

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
  const {token} = useAuthContext() 
  




  async function sendDataToFlask(data: ConsoleData ) {

    try {
      const response = await fetch("/api/admin/add_console", {
        method: "POST",
        headers:  {Authorization: 'Bearer ' + token},
        body: JSON.stringify(data)
      });
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setResponse(result.data);
    } catch (error){
        console.error('Error:', error);
        setResponse("An error occurred while submitting the form.");
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
    <div className="d-flex flex-column justify-content-center" >
    
    <form onSubmit={submitConsole} className="console_form d-flex flex-column ">
    <h1> Add a Console </h1>
      <label>
        Title:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      </label>
      <label>
        Year:
        <input
          type="number"
          value={year}
          min="1972"
          max={new Date().getFullYear()}
          onChange={(e) => setYear(e.target.value)}/>
      </label>
      <label>
        Firm:
        <input type="text" value={firm} onChange={(e) => setFirm(e.target.value)}/>
      </label>
      
      <button type="submit" className="form_button  btn btn-dark">Add Console</button>
      <p> {response} </p>
    </form>

    
    </div>
  )

}

export default AddConsole;