export const getAddressByReversedGeocode = async (
  longitude: number | string,
  latitude: number | string
) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
      import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    }`
  );
  const data = await response.json();
  const address = data?.features[0]?.place_name;
  return address;
};
