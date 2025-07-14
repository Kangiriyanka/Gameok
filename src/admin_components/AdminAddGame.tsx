
import {useState} from 'react'
import ConsoleDropdown from "../game_components/ConsoleDropdown.tsx"
import { useAuthContext } from "../context/AuthContext.js";
import '../assets/styles/add_game.css';

type GameData = {
  title: string;
  year: string;
  series: string;
  console: string;
  memories: string;
  coverPhoto: File | null;
}


function AddGame() {

  const [response, setResponse] = useState("")
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [series, setSeries] = useState("");
  const [consoleName, setConsoleName] = useState('');
  const [memories, setMemories] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const {token} = useAuthContext();
  

  async function sendDataToFlask(data: GameData) {

    const formData = new FormData();
    if (data.coverPhoto) {
      formData.append('coverPhoto', data.coverPhoto);
    }
    formData.append('title', data.title);
    formData.append('year', data.year);
    formData.append('series', data.series);
    formData.append('console', data.console);
    formData.append('memories', data.memories);

   try {
    const response = await fetch('/api/admin/add_game', {
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
      setResponse(result.data.msg);
      
  } catch (error) {
      console.error('Error:', error);
      setResponse("An error occurred while submitting the form.");
    }
  
}


  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement> ) {
  
   if (e.target.files && e.target.files.length > 0) {
      setCoverPhoto(e.target.files[0]);
}
   
    
    
  }
  
  

  function submitGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
   
    const data: GameData = {
      "title": title,
      "year": year,
      "series": series,
      "console": consoleName,
      "memories": memories,
      "coverPhoto": coverPhoto 
    }

  
    sendDataToFlask(data)
  }
     

    //  Function to pass as props to the dropdown component
     const handleConsoleSelect = (value: string) => {
      setConsoleName(value);
    }

   

  return (


    <div >
      <div className="page-header">
           <h1> Add Games</h1>
      </div>
 
    <form onSubmit={submitGame} className="reg-form">
  
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
          max={new Date().getFullYear()}
          onChange={(e) => setYear(e.target.value)}/>
      </label>
      <label>
        Console:
         <ConsoleDropdown onConsoleSelect={handleConsoleSelect}/>
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
      <button type="submit" className="form-button">Add Game</button>
      <p> {response} </p>
    </form>

    
    </div>
  )

}

export default AddGame;