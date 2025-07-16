
type GameTitle = string;

export  async function gamesLoader() {
  
    
    try {
      const response = await fetch("/api/game/get_all_game_titles", {
        method: "GET",
         credentials: "include",
      });

      if (!response.ok) {
        console.error("HTTP error status:", response.status);
        return;
      }

      const games = await response.json();
      return games as GameTitle[];
  
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

