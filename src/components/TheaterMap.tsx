import { MapContainer, Marker, Popup, TileLayer, useMapEvents, GeoJSON } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMemo, useState, useEffect } from 'react'
import L from 'leaflet'
import { Button } from '@/components/ui/button'
import type { getTheaters } from '@/data/theaters'

const FRANCE_CENTER: LatLngExpression = [46.2276, 2.2137]

interface TheaterMapProps {
    theaters: Awaited<ReturnType<typeof getTheaters>>
}

export default function TheaterMap({ theaters }: TheaterMapProps) {
    const [regionsGeoJson, setRegionsGeoJson] = useState<any>(null)

    useEffect(() => {
        fetch('/geojson/regions-1000m.geojson')
            .then(response => response.json())
            .then(data => setRegionsGeoJson(data))
            .catch(error => console.error('Error loading regions GeoJSON:', error))
    }, [])

    return (
        <div className="h-[calc(100vh-var(--navbar-height))] overflow-hidden flex flex-row">
            <MapContainer center={FRANCE_CENTER} zoom={6} scrollWheelZoom className="h-full w-full flex-3">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {regionsGeoJson && (
                    <GeoJSON
                        data={regionsGeoJson}
                        style={() => ({
                            fillColor: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
                            fillOpacity: 0.3,
                            color: '#000000',
                            weight: 1,
                            opacity: 0.7,
                        })}
                    />
                )}
                <ZoomAwareMarkers theaters={theaters} />
            </MapContainer>
        </div>
    )
}

function ZoomAwareMarkers({ theaters }: TheaterMapProps) {
    const [zoom, setZoom] = useState<number>()

    useMapEvents({
        zoomend: (event) => setZoom(event.target.getZoom()),
    })

    const icon = useMemo(() => {
        const size = Math.max(18, Math.min(52, (zoom ?? 6) * 2 + 2))
        return new L.Icon({
            iconUrl: '/marker.svg',
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            popupAnchor: [0, -size],
        })
    }, [zoom])

    return theaters.map((theater) => (
        <Marker key={theater.id} position={[theater.latitude, theater.longitude]} icon={icon}>
            <Popup className="bg-red-300 text-black">{theater.name}</Popup>
        </Marker>
    ))
}

