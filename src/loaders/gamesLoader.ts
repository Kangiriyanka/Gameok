
type GameTitle = string;
export  async function gamesLoader() {
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch("/api/game/get_all_game_titles", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
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

