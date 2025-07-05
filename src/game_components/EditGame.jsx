import React from "react";
import {useState} from 'react'

import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import './AddGame.css';



function EditGame(props) {

  
  const [response, setResponse] = useState("")
  const { game_id, series, title, year } = useParams();
  const [newTitle, setNewTitle] = useState(title);
  const [newYear, setNewYear] = useState(year);
  const [newSeries, setNewSeries] = useState(series);
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);
  const navigate = useNavigate();

  
  

  const config = {
    headers: {
      'Content-Type':  'multipart/form-data',
      'Access-Control-Allow-Origin': '*', // Set the Content-Type header to application/json
      Authorization: 'Bearer ' + props.token
     
    }
  };


  function handleFileUpload(e) {
   
    setNewCoverPhoto(e.target.files[0]);
    
  }

  function sendDataToFlask(data) {

    const formData = new FormData();
    formData.append('coverPhoto', data.coverPhoto);
    formData.append('title', data.title);
    formData.append('year', data.year);
    formData.append('series', data.series);
   
    
    

    axios
      .post(`/edit_game/${game_id}`, formData, config)
      .then(response => {
       
        setResponse(response.data);
        navigate(`/my_games`)
        
      })
      .catch(error => {
        console.log(error)
  });

  }

  function submitEditedGame(e) {
    e.preventDefault();

    const data = {
      "title" : newTitle,
      "year" : newYear,
      "series" : newSeries,
      "coverPhoto" : newCoverPhoto
    
    }

    console.log(data)

    sendDataToFlask(data)
  }



     

   
  return (
    <div >

      
    <form  onSubmit={submitEditedGame} className="d-flex flex-column game_form">
    <h3> Edit Game Information for  {title} </h3>
    

    <label>
        Title:
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}/>
      </label>
      <label>
        Series:
        <input
          type="text"
          value={newSeries}
          onChange={(e) => setNewSeries(e.target.value)}/>
      </label>

      <label>
        Year:
        <input
          type="number"
          value={newYear}
          min="1972"
          max="2023"
          onChange={(e) => setNewYear(e.target.value)}/>
      </label>

      <label>
        Cover Photo:
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </label>

      
      <button type="submit" className="form_button btn btn-dark">Edit Game</button>
      <p> {response} </p>
    </form>

    
 
    
    </div>
  )

}

export default EditGame;