import React from "react";
import {useState, useEffect} from 'react'
import axios from "axios";
import './AddGame.css';




function Dropdown(props) {

const [consoles, setConsoles] = useState([]);



// Only make a GET request once 
useEffect(() => {
  async function fetchData() {
    axios({
      method: "GET",
      url:"/get_consoles",
      headers: {
        Authorization: 'Bearer ' + props.token
      }

      
    })
      .then(response => {
        console.log(response.data);
        setConsoles(response.data)
      })
    
      .catch(error => {
            console.log(error.response)
      });
    
  }
  fetchData();
}, []);


const handleConsoleSelect = (event) => {
  props.onConsoleSelect(event.target.value);
}

const consoleSelects = consoles.map((console) =>
  <option key={console} value = {console}>{console}</option>)


 
   return (
    <select name="selectedConsole"  onChange={handleConsoleSelect}>

      <option key="default" value="">Select a console</option>
      {consoleSelects}

        
    </select>

 

    


   )
  
  }



  export default Dropdown;