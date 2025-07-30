import { fetchWithCSRF } from "../assets/scripts/csrf";



export async function adminLoader() {
 

  const response = await fetchWithCSRF("/api/admin/isAdmin/", {
   
  });

  if (!response.ok) {
    throw new Response("Failed to fetch consoles", { status: response.status });
  }

  const result = await response.json();
  return result.msg
}