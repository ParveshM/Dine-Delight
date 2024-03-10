import ReactMapGl, { Marker } from "react-map-gl";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

export const TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const CustomMap = ({ longitude, latitude, updateCoordinates }: any) => {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 16,
  });

  useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  const handleMarkerDrag = (event: any) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;
    updateCoordinates(latitude, longitude);
  };

  return (
    <div className="h-44">
      <ReactMapGl
        {...viewport}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={(event) => {
          setViewport(event.viewState);
        }}
      >
        <Marker
          latitude={latitude}
          longitude={longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <MapPin color="#ff0000" width={30} height={30} strokeWidth={2.5} />
        </Marker>
      </ReactMapGl>
    </div>
  );
};

export default CustomMap;
