export default async function getPlaces(query: string) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${
        import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
      }`
    );
    const data = await response.json();
    return data.features;
  } catch (error) {
    console.error("There was an error while fetching places:", error);
    throw error;
  }
}
