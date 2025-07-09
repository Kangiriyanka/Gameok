


type GameConsole = {
  console_id: number;
  console_name: string;
}

export async function consolesLoader() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const response = await fetch("/console/get_owned_consoles", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Response("Failed to fetch consoles", { status: response.status });
  }

  const consoles = await response.json();
  return consoles as GameConsole[]
}