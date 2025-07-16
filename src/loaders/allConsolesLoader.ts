import { fetchWithCSRF } from "../assets/scripts/csrf";

type GameConsole = {
  console_id: number;
  console_name: string;
}

export async function allConsolesLoader() {
 

  const response = await fetchWithCSRF("/api/console/get_all_consoles", {
   
  });

  if (!response.ok) {
    throw new Response("Failed to fetch consoles", { status: response.status });
  }

  const consoles = await response.json();
  return consoles as GameConsole[]
}