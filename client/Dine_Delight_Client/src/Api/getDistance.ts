import axios from "axios";

export default async function getDistance(
  startPoint: (number | string)[],
  endPoint: (number | string)[]
) {
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint[0]},${
        startPoint[1]
      };${endPoint[0]},${endPoint[1]}?geometries=geojson&access_token=${
        import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
      }`
    );
    const distance = data.routes[0].distance;
    const distanceInKilometers = (distance / 1000).toFixed(1);
    return distanceInKilometers;
  } catch (error) {
    console.error("Error fetching distance:", error);
    return "";
  }
}
