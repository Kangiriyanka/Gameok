import { fetchWithCSRF } from "../assets/scripts/csrf";



export async function adminLoader() {
 

  const response = await fetchWithCSRF("/api/admin/isAdmin/", {
   
  });

  if (!response.ok) {
    throw new Response("Failed to fetch consoles", { status: response.status });
  }

  if (response.status === 401) {
    throw new Response("Unauthorized connection", { status: 401 });
  }

  

  const result = await response.json();
  return result.msg
}