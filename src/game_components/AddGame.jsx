import React from "react";
import {useState} from 'react'
import axios from "axios";
import Dropdown from "./Dropdown.jsx"
import { useNavigate } from "react-router-dom";
import './AddGame.css';



function AddGame(props) {

  const [response, setResponse] = useState("")
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [series, setSeries] = useState("");
  const [console, setConsole] = useState('');
  
  const [memories, setMemories] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);

  const navigate = useNavigate();


  const config = {
    headers: {
      'Content-Type':  'multipart/form-data',
      'Access-Control-Allow-Origin': '*', // Set the Content-Type header to application/json
      Authorization: 'Bearer ' + props.token
     
    }
  };

  function sendDataToFlask(data) {

    const formData = new FormData();
    formData.append('coverPhoto', data.coverPhoto);
    formData.append('title', data.title);
    formData.append('year', data.year);
    formData.append('series', data.series);
    formData.append('console', data.console);
    formData.append('memories', data.memories);

   
    axios
      .post('/add_game', formData, config)
      .then(response => {
        setResponse(response.data);
        
        
      })
      .catch(error => {

        console.log(error)
  });

  }


  function handleFileUpload(e) {
  
    setCoverPhoto(e.target.files[0]);
    
    
  }
  
  

  function submitGame(e) {
    e.preventDefault();
   
    const data = {
      "title": title,
      "year": year,
      "series": series,
      "console": console,
      "memories": memories,
      "coverPhoto": coverPhoto
    }

    

    sendDataToFlask(data)
  }
     

    //  Function to pass as props to the dropdown component
     const handleConsoleSelect = (value) => {
      setConsole(value);
    }

   

  return (


    <div className= "d-flex flex-column justify-content-center">
    
 
    <form onSubmit={submitGame} className="d-flex flex-column game_form">
    <h1> Add a Game </h1>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </label>
      <label>
        Year:
        <input
          type="number"
          value={year}
          min="1972"
          max="2023"
          onChange={(e) => setYear(e.target.value)}/>
      </label>
      <label>
        Console:
         <Dropdown onConsoleSelect={handleConsoleSelect} token={props.token}/>
      </label>
      <label>
        Series:
        <input type="text" value={series} onChange={(e) => setSeries(e.target.value)}/>
      </label>
      <label>
        Memories:
        <input
          type="textarea"
          value={memories}
          onChange={(e) => setMemories(e.target.value)}/>
      </label>

      
      <label>
  Cover Photo:
  <input type="file" accept="image/*" onChange={handleFileUpload} />
</label>
      <button type="submit" className="form_button btn btn-dark">Add Game</button>
      <p> {response} </p>
    </form>

    
    </div>
  )

}

export default AddGame;