
import {useState} from 'react'
import ConsoleDropdown from "../game_components/ConsoleDropdown.tsx"
import '../assets/styles/add_game.css';
import { fetchWithCSRF } from '../assets/scripts/csrf.ts';
import ErrorBox from '../animation_components/ErrorBox.tsx';

type GameData = {
  title: string;
  year: string;
  series: string;
  console: string;
  coverPhoto: File | null;
}


function AddGame() {

  const [response, setResponse] = useState("")
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [series, setSeries] = useState("");
  const [consoleName, setConsoleName] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [count, setCount] = useState(0)

  

  async function sendDataToFlask(data: GameData) {

    const formData = new FormData();
    if (data.coverPhoto) {
      formData.append('coverPhoto', data.coverPhoto);
    }
    formData.append('title', data.title);
    formData.append('year', data.year);
    formData.append('series', data.series);
    formData.append('console', data.console);
  

   try {
    const response = await fetchWithCSRF('/api/admin/add_game', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorResult = await response.json()
        setCount(prev => prev+1)
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
  Cover Photo:
  <input type="file" accept="image/*" onChange={handleFileUpload} />
</label>
      <button type="submit" className="form-button">Add Game</button>
     
    </form>

       <ErrorBox response = {response} count= {count}/>

    
    </div>
  )

}

export default AddGame;