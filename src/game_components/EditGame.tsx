import React from "react";
import {useState} from 'react'
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, useParams} from "react-router-dom";
import '../assets/styles/add_game.css';

function EditGame() {

  
  const [response, setResponse] = useState("")
  const { game_id, series, title, year } = useParams();
  const [newTitle, setNewTitle] = useState(title ?? "");
  const [newYear, setNewYear] = useState(year ?? "");
  const [newSeries, setNewSeries] = useState(series ?? "");
  const [newCoverPhoto, setNewCoverPhoto] = useState<File | null>(null);
  const navigate = useNavigate();
  const { token } = useAuthContext();

  
 type EditGameData = {
  title: string;
  year: string;
  series: string;
  coverPhoto: File | null;
}


  async function sendDataToFlask(data: EditGameData) {

    const formData = new FormData();
    if (data.coverPhoto) {
      // Append the cover photo file to the FormData object
      formData.append('coverPhoto', data.coverPhoto);
    }
    formData.append('title', data.title);
    formData.append('year', data.year);
    formData.append('series', data.series);
   
    
    try {
      const response = await fetch(`/edit_game/${game_id}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.json();
      setResponse(result)
      navigate('/games');
    } catch (error) {
      console.error('Error:', error);
      setResponse("An error occurred while submitting the form.");
    }
    

  }

   function handleFileUpload(e: React.ChangeEvent<HTMLInputElement> ) {
  
   if (e.target.files && e.target.files.length > 0) {
      setNewCoverPhoto(e.target.files[0]);
}
   
  }

  function submitEditedGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: EditGameData = {
      "title" : newTitle,
      "year" : newYear,
      "series" : newSeries,
      "coverPhoto" : newCoverPhoto
    
    }


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
          max={new Date().getFullYear()}
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