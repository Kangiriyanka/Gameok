
type GameTitle = string;

export  async function gamesLoader() {
  
    
  
      const response = await fetch("/api/game/get_all_game_titles", {
        method: "GET",
         credentials: "include",
      });

       if (response.status === 401) {
  
 
        throw new Response("Unauthorized to fetch all game titles", { status: response.status });
      }

      else if (!response.ok) {
        
        throw new Response("Failed to fetch all game titles", { status: response.status });
      }

      const games = await response.json();
      return games as GameTitle[];
  
   


  }



