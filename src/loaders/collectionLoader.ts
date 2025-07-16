export async function collectionLoader() {


  try {
    const response = await fetch("/api/collection/get_games", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result

  } catch (error) {
    console.error("Fetch error:", error);
  }
}