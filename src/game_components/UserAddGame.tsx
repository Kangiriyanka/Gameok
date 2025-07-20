
import {useState} from 'react'
import { useLoaderData } from 'react-router';
import '../assets/styles/add-game.css';
import { fetchWithCSRF } from '../assets/scripts/csrf.ts';
import ErrorBox from '../animation_components/ErrorBox.tsx';
import ConsoleOption from './ConsoleOption.tsx';
import GameOption from './GameOption.tsx';
import { AnimatePresence, motion } from 'motion/react';




function UserAddGame() {

    const game_consoles = useLoaderData(); 
  
    const [response, setResponse] = useState('')
    const [count, setCount] = useState(0)
    const [consoles, setConsoles] = useState(Object.keys(game_consoles))
    const [isConsoleSelected, setIsConsoleSelected] = useState(false);
    const [isGameSelected, setIsGameSelected] = useState(false)
    const [filteredGames, setFilteredGames] = useState([])
    const [selectedConsole, setSelectedConsole] = useState('')
    const [selectedGame, setSelectedGame] = useState('')
    const [coverPhoto, setCoverPhoto] =  useState<string | null>(null);
   

    function fetchCover(game_title: string) {
      setCoverPhoto(`/api/game/fetch_cover/${game_title}/`);
  
    }

    function dismiss() {
     
      setIsGameSelected(false)
      setSelectedGame("")
    }
   
    
    async function sendDataToFlask() {

        const formData = new FormData();
        formData.append('title', selectedGame);
    
    
    
        try {
          const response = await fetchWithCSRF("/api/game/user_add_game", {
            method: "POST",
            body: formData,
          
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
              
              console.error(error.message);
              setResponse(error.message)
        } 
      
      };
         
      
    
      }
    
    
      // Selecting the same console will remove it
      const filterConsoleGames = (console_name: string) => {

        if (selectedConsole == console_name) {
          setSelectedConsole("")
          setSelectedGame("")
          setIsConsoleSelected(false)
          setCoverPhoto(null)
        
        }

        else {
        setSelectedConsole(console_name)
        setIsConsoleSelected(true)
        setSelectedGame("")
        setIsGameSelected(false)
        setFilteredGames(game_consoles[console_name])
        setCoverPhoto(null)
        }
        
      }

      const selectGame = (game_title: string) => {
        if (selectedGame == game_title) {
          setSelectedGame("")
          setIsGameSelected(false)
          setCoverPhoto(null)
        }

        else {
          setSelectedGame(game_title)
          setIsGameSelected(true)
          fetchCover(game_title)
        }
       
      }
   

    return (


        <div className= "add-game-container">
           <div className="page-header">
           <h1> Add Games</h1>
           
        </div>  
        
         
        <div className="mt-5 relative flex flex-col top-8 left-12 w-[80%] h-[100%]" >
   
        <h2 > Select a console </h2>

        <div className= "console-selector-container">
              
         {consoles && consoles.map((console: string) => (
          <ConsoleOption onConsoleSelect= {filterConsoleGames} name={console} selected ={selectedConsole}/>

          
  
))}
</div>

<AnimatePresence mode="wait"> 

{isConsoleSelected && (


  <motion.div className="mt-12" 
      key={selectedConsole}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit = {{opacity:0 }}
   
      transition={{ duration: 0.2 }}>
  <h2 > Select a game</h2>
  <div className= "game-selector-container">
    
              
         {filteredGames && filteredGames.map((console: string) => (
          <GameOption onGameSelect= {selectGame} name={console} selected={selectedGame}/>

          
  
))}
      </div>
      </motion.div>
      
)}

</AnimatePresence>






  
  


  
  
      </div>



    


        

           {isConsoleSelected && isGameSelected && (
<motion.div className="cover-container"


      key={selectedGame}
      initial={{ opacity: 0, y:-10}}
      animate={{ opacity: 1, y: 0}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeIn" }}
    >
   <h1>Adding {selectedGame}... </h1>
<div className= "cover-contents">

 <AnimatePresence mode="wait">
  {coverPhoto && (
    <div>
      <img 
        src={coverPhoto} 
        alt="Game cover" 
      />

   
    </div>
  )}
</AnimatePresence>
  <div className= "flex gap-8 mt-8 w-[100%] justify-around  ">
  <button onClick= {() => dismiss()} id ="dismiss-button"> Dismiss </button>
  <button  onClick={() => sendDataToFlask()} id="add-game-button"> Add </button>
  </div>

 <ErrorBox isCover = {true} response = {response} count= {count}/>
</div>
</motion.div>
)}
           
        </div>


    )
}


export default UserAddGame;