
import '../assets/styles/add_game.css';

type DropdownProps = {
  onGameSelect: (console: string) => void;
  games: string[];

}
type GameTitle = string;



function GameDropdown({games, onGameSelect}: DropdownProps) {



const handleGameSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  onGameSelect(event.target.value);
}

const gameSelects = games.map((game: GameTitle) =>
  <option key={game} value = {game}>{game}</option>)
  

 
   return (


    <select name="selectedGame"  onChange={handleGameSelect}>

      <option key="default" value="">Select a game</option>
      {gameSelects}

        
    </select>

 

    


   )
  
  }



  export default GameDropdown;