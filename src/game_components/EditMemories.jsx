import React from "react";
import {useState} from 'react'
import axios from "axios";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import './AddGame.css';



function EditMemories(props) {

  
  const [response, setResponse] = useState("")
  const location = useLocation();
  const { edit_memories} = location.state;
  const [new_memories, setNewMemories] = useState(edit_memories)
  const { game_id, title } = useParams();
  console.log(title)
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

    formData.append('memories', data.memories);


    axios
      .post(`/edit_game_memories/${game_id}`, formData, config)
      .then(response => {
       
        setResponse(response.data);
        navigate(`/game/${game_id}/${title}`)
        
      })
      .catch(error => {
        console.log(error)
  });

  }

  function submitMemories(e) {
    e.preventDefault();

    const data = {
      
      "memories": new_memories,
    
    }

    sendDataToFlask(data)
  }

  
     

   
  return (
    <div className= "d-flex flex-column justify-content-center">
    
    
 
    <form  onSubmit={submitMemories} className="d-flex flex-column game_form">
    <h3> Edit Memories for  {title} </h3>
    
      <label>
        Memories:
        <input
          type="textarea"
          value={new_memories}
          onChange={(e) => setNewMemories(e.target.value)}/>
      </label>

      
      <button type="submit" className="form_button btn btn-dark">Edit Memories</button>
      <p> {response} </p>
    </form>
      
    </div>
  )

}

export default EditMemories;