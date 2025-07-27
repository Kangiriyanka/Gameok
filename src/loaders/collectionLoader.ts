export async function collectionLoader() {


    const response = await fetch("/api/collection/get_owned_games", {
      method: "GET",
      credentials: "include",
    });

      if (response.status === 401) {
  
 
        throw new Response("Unauthorized to fetch owned games", { status: response.status });
      }

      else if (!response.ok) {
        
        throw new Response("Failed to fetch owned games", { status: response.status });
      }

    const result = await response.json();
    return result



}