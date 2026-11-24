

"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";
import { ParkingSpot } from "@/types/types";

type Coordinates = {
  lat: number;
  lon: number;
};

type MapProps = {
  spots: ParkingSpot[];
  hoveredSpotId: string | null;
  destination?: string;
  coordinates: Coordinates | null;
};

type FocusSpotProps = {
  spots: ParkingSpot[];
  hoveredSpotId: string | null;
};

// Move the map to the searched city
function ChangeMapView({
  coordinates,
}: {
  coordinates: Coordinates | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!coordinates) return;

    map.flyTo(
      [coordinates.lat, coordinates.lon],
      13,
      { duration: 1.5 }
    );
  }, [coordinates, map]);

  return null;
}

// Zoom into a parking spot when hovering over its card
function FocusSpot({ spots, hoveredSpotId }: FocusSpotProps) {
  const map = useMap();

  useEffect(() => {
    if (!hoveredSpotId) return;

    const spot = spots.find(
      (item) => String(item.id) === hoveredSpotId
    );

    if (!spot) return;

    map.flyTo(
      [Number(spot.latitude), Number(spot.longitude)],
      17,
      { duration: 0.8 }
    );
  }, [hoveredSpotId, spots, map]);

  return null;
}

export default function Map({
  spots,
  hoveredSpotId,
  destination = "",
  coordinates,
}: MapProps) {
  const city = (destination ?? "").trim().toLowerCase();

  const validSpots = spots.filter((spot) => {
    const lat = Number(spot.latitude);
    const lng = Number(spot.longitude);

    const validCoordinates =
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180;

    const spotCity = (spot.city ?? "").trim().toLowerCase();

    const matchesDestination =
      !city || spotCity === city;

    return validCoordinates && matchesDestination;
  });

  return (
    <div className={styles.container}>
      <MapContainer
        center={[46.7712, 23.6236]}
        zoom={13}
        className={styles.map}
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapView coordinates={coordinates} />

        <FocusSpot
          spots={validSpots}
          hoveredSpotId={hoveredSpotId}
        />

        {validSpots.map((spot) => {
          const isHovered =
            String(spot.id) === hoveredSpotId;

          return (
            <CircleMarker
              key={spot.id}
              center={[
                Number(spot.latitude),
                Number(spot.longitude),
              ]}
              radius={isHovered ? 16 : 10}
              pathOptions={{
                color: isHovered ? "#f97316" : "#ffffff",
                fillColor: isHovered ? "#f97316" : "#16a34a",
                fillOpacity: 1,
                weight: 3,
              }}
            >
              <Popup>
                <div className={styles.popUp}>
                  {spot.photos?.[0]?.photo_url && (
                    <img
                      src={spot.photos[0].photo_url}
                      alt={spot.name}
                    />
                  )}

                  <strong>{spot.name}</strong>
                  <p>{spot.address}</p>
                  <p>€{spot.price_per_hours}/hour</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}