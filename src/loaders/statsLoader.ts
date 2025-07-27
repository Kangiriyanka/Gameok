export async function statsLoader(): Promise<number[]> {
  const [games_response, consoles_response] = await Promise.all([
    fetch("/api/collection/get_owned_games", { method: "GET", credentials: "include" }),
    fetch("/api/console/get_owned_consoles", { method: "GET", credentials: "include" }),
  ]);

  if (games_response.status === 401) {
    throw new Response("Unauthorized to fetch games", { status: 401 });
  } else if (!games_response.ok) {
    throw new Response("Failed to fetch games", { status: games_response.status });
  }

  if (consoles_response.status === 401) {
    throw new Response("Unauthorized to fetch consoles", { status: 401 });
  } else if (!consoles_response.ok) {
    throw new Response("Failed to fetch consoles", { status: consoles_response.status });
  }

  const games_result = await games_response.json();
  const consoles_result = await consoles_response.json();

  return [games_result.games.length, consoles_result.consoles.length];
}