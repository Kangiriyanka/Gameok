export async function statsLoader(): Promise<number[]> {
  const numbers: number[] = [];

  // Get owned games
  try {
    const response = await fetch("/api/collection/get_owned_games", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Games fetch error! status: ${response.status}`);
    }

    const result = await response.json();
    const numberOfGames = result.games.length;
    numbers.push(numberOfGames);
  } catch (error) {
    console.error("Fetch error (games):", error);
    numbers.push(0);
  }

  // Get owned consoles
  try {
    const response = await fetch("/api/console/get_owned_consoles", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Consoles fetch error! status: ${response.status}`);
    }

    const result = await response.json();
    const numberOfConsoles = result.consoles.length;
    numbers.push(numberOfConsoles);
  } catch (error) {
    console.error("Fetch error (consoles):", error);
    numbers.push(0); 
  }

  
  return numbers;
}