

type GameConsole = {
  console_id: number;
  console_name: string;
}

export async function consolesLoader() {



  const response = await fetch("/api/console/get_owned_consoles", {
    credentials: "include",
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    throw new Response("Failed to fetch consoles", { status: response.status });
  }

  else if (!response.ok) {
    
    throw new Response("Failed to fetch consoles", { status: response.status });
  }

  
  const consoles = await response.json();
  return consoles as GameConsole[]
}