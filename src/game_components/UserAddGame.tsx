
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
    const [consoles, setConsoles] = useState(
  Object.keys(game_consoles).sort((a, b) => a.localeCompare(b))
);    const [isConsoleSelected, setIsConsoleSelected] = useState(false);
    const [consoleSearchValue, setConsoleSearchValue] = useState("")
    const [gameSearchValue, setGameSearchValue] = useState("")
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
      setResponse('')
    }


    // Search bar to filter the consoles
    function narrowConsoles(e: React.ChangeEvent<HTMLInputElement>) {
            const allConsoles = Object.keys(game_consoles)
            const value = e.target.value;
            setConsoleSearchValue(value)

            if (!value) {
              setConsoles(Object.keys(game_consoles));
              return;
          }
        
            const results = allConsoles.filter((console: string) =>
            console.replace(/\s+/g, "").toLowerCase().includes(value.replace(/\s+/g, "").toLowerCase())
          );

          console.log(results)
              setConsoles(results);
    }



    // Search bar to filter the games 
    function narrowGames(e: React.ChangeEvent<HTMLInputElement>) {
 
    const value = e.target.value;
    setGameSearchValue(value)
  

    if (!value) {
    setFilteredGames(game_consoles[selectedConsole].sort( (a: string,b:string ) => a.localeCompare(b)))

      return;
  }


      const results = game_consoles[selectedConsole].filter((game: string) =>
        game.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGames(results);
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
        setFilteredGames(game_consoles[console_name].sort( (a: string,b:string ) => a.localeCompare(b)))
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
        
         
        <div className="mt-5 relative flex flex-col top-8 left-12 w-[80%]" >
        <div className= "flex  items-center justify-between">
        <h2 > Select a console </h2>
        <div className="flex items-center gap-2 border-1 rounded-lg p-2">
        <input value={consoleSearchValue} onChange={(e) => narrowConsoles(e)} className= "search-input w-50" type="text" placeholder= "Filter..."/> 
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--text-clr)"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>

        </div>
        </div>

        <div className= "console-selector-container">
              
         {consoles && consoles.length > 0 ? ( 
          consoles.map((console: string) => <ConsoleOption onConsoleSelect= {filterConsoleGames} name={console} selected ={selectedConsole}/> 
        )) :
         (<p className =" p-2 border text-lg rounded-lg w-[100%] text-center col-span-2 mx-0 h-fit opacity-50"> No consoles found (^_^*)</p>)
        }

          
  

</div>

<AnimatePresence mode="wait"> 

{isConsoleSelected && (


  <motion.div className="mt-12" 
      key={selectedConsole}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit = {{opacity:0 }}
   
      transition={{ duration: 0.2 }}>
  <div className= "flex gap-8 items-center justify-between">
  <h2 > Select a game</h2>
<div className="flex items-center gap-2 border-1 rounded-lg p-2">
  <input value={gameSearchValue} onChange={(e) => narrowGames(e)}  className="search-input w-50" type="text" placeholder= "Filter..."/> 
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--text-clr)"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
</div>
  </div>
  <div className= "game-selector-container">
    
              
         {filteredGames && filteredGames.length > 0 ? (filteredGames.map( (console: string) => (
          <GameOption onGameSelect= {selectGame} name={console} selected={selectedGame}/>))) :  (<p className =" p-2 border text-lg rounded-lg  text-center  col-span-2 h-fit opacity-50"> No games found (^_^*)</p>)
         }

          
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


</div>

 <ErrorBox key={count} handleDismiss={() => setResponse('')} isCover = {true} response = {response} count= {count}/>

</motion.div>

)}
           
        </div>


    )
}


export default UserAddGame;