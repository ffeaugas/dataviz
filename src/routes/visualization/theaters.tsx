import { createFileRoute } from '@tanstack/react-router'
import { getTheaters } from '@/data/theaters'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export const Route = createFileRoute('/visualization/theaters')({
  component: RouteComponent,
  loader: async () => await getTheaters(),
})

const FRANCE_CENTER: LatLngExpression = [46.2276, 2.2137]

function RouteComponent() {
  const theaters = Route.useLoaderData()

  if (!theaters) {
    return <div>No theaters found</div>
  }

  return (
    <div className="h-[calc(100vh-var(--navbar-height))] overflow-hidden rounded-lg shadow-lg">
      <MapContainer center={FRANCE_CENTER} zoom={6} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {theaters.map((theater) => (
          <Marker key={theater.id} position={[theater.latitude, theater.longitude]}>
            <Popup className="bg-red-300 text-black">{theater.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
