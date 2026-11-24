
"use client";

import dynamic from "next/dynamic";
import { ParkingSpot } from "@/types/types";

type Coordinates = {
  lat: number;
  lon: number;
};

type Props = {
  spots: ParkingSpot[];
  hoveredSpotId: string | null;
  destination?: string;
  coordinates: Coordinates | null;
};

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function MapWrapper({
  spots,
  hoveredSpotId,
  destination = "",
  coordinates,
}: Props) {
  return (
    <Map
      spots={spots}
      hoveredSpotId={hoveredSpotId}
      destination={destination}
      coordinates={coordinates}
    />
  );
}
