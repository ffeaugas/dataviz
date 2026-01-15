import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const FRANCE_CENTER: LatLngExpression = [46.2276, 2.2137];

const TestGeoJson = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="mt-6 h-[500px] rounded-lg bg-slate-900/40" />;
  }

  const BRADY_POINT: LatLngExpression = [48.871771, 2.355398];

  return (
    <div className="h-[calc(100vh-var(--navbar-height))] overflow-hidden rounded-lg shadow-lg">
      <MapContainer
        center={FRANCE_CENTER}
        zoom={6}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={BRADY_POINT}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TestGeoJson;
