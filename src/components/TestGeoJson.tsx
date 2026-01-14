import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const FRANCE_CENTER: LatLngExpression = [46.2276, 2.2137];

const TestGeoJson = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Avoid rendering on the server where Leaflet expects a DOM.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="mt-6 h-[500px] rounded-lg bg-slate-900/40" />;
  }

  return (
    <div className="h-[calc(100vh-var(--navbar-height))] overflow-hidden rounded-lg shadow-lg">
      <MapContainer
        center={FRANCE_CENTER}
        zoom={5}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default TestGeoJson;
