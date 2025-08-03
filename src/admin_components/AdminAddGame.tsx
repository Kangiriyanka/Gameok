
import {useState} from 'react'
import ConsoleDropdown from "../game_components/ConsoleDropdown.tsx"
import { fetchWithCSRF } from '../assets/scripts/csrf.ts';
import ErrorBox from '../animation_components/ErrorBox.tsx';
import { motion } from 'motion/react';

type GameData = {
  title: string;
  year: string;
  series: string;
  console: string;
  coverPhoto: File | null;
}

type CSVData = {
  csvFile: File | null;
}


function AddGame() {

  const [response, setResponse] = useState("")
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [series, setSeries] = useState("");
  const [consoleName, setConsoleName] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [count, setCount] = useState(0)
  const [isCSV, setIsCSV] = useState(true);
  
  async function sendCSVToFlask(data: CSVData) {

    const formData = new FormData();
    
    if (data.csvFile) {
      formData.append('csvFile', data.csvFile);
    }

       try {
    const response = await fetchWithCSRF('/api/admin/add_games_from_csv/', {
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


  function handleCSVUpload(e: React.ChangeEvent<HTMLInputElement> ) {
    
    if (e.target.files && e.target.files.length > 0) {
        setCsvFile(e.target.files[0]);
  }
   
    
    
  }
  
    
  function submitCSV(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
   
    const data: CSVData = {
      "csvFile": csvFile
     
    }

    sendCSVToFlask(data)
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

      <div className="btn-container">
        <motion.button 
        onClick ={() => setIsCSV( prev => !prev)} 
        className={`toggle-button ${isCSV ? "active-button" : ""}`}
        whileHover={{ scale: 1.10}}
        whileTap={{ scale: 0.95 }}
        > Toggle CSV
  
       
        </motion.button>
      </div>
    
    {!isCSV ? (
    <form onSubmit={submitGame} className="reg-form admin-form">
  
      <label>
        <span className="label-text">Title</span> 
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
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
          <span className="label-text">Console</span> 
         <ConsoleDropdown onConsoleSelect={handleConsoleSelect}/>
      </label>
      <label>
          <span className="label-text">Series</span> 
        <input type="text" value={series} onChange={(e) => setSeries(e.target.value)}/>
      </label>
    

      
      <label>
   <span className="label-text">Cover</span> 
  <input type="file" accept="image/*" onChange={handleFileUpload} />
</label>
               <motion.button  whileHover={{ scale: 1.05}}
     whileTap={{ scale: 0.95 }}
     transition= {{duration: 0.1}} type="submit" className="form-button" >Add Game</motion.button>
     

    </form>
    ) : (

       <form onSubmit={submitCSV} className="mt-10 reg-form admin-form">
  

      
            <label>
        <span className="label-text">CSV</span> 
        <input type="file" accept=".csv" onChange={handleCSVUpload} />
      </label>
                    <motion.button  whileHover={{ scale: 1.05}}
          whileTap={{ scale: 0.95 }}
          transition= {{duration: 0.1}} type="submit" className="form-button" >Add from CSV</motion.button>
          
    </form>
    )}

        <ErrorBox key={count} handleDismiss={() => setResponse('')} isCover = {false} response = {response} count= {count}/>

    
    </div>

  )

}

export default AddGame;