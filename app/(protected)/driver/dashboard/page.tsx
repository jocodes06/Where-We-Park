
"use client";

import styles from "./driver.module.css";
import useParkingSpots from "@/hooks/useParkingSpots";
import Loading from "@/components/Loading";
import { addFavorites } from "@/lib/driverFavorites";
import useFavorites from "@/hooks/useFavorites";
import { removeFavorite } from "@/lib/removeFavorite";
import WideCard from "@/components/cards/WideCard";
import React from "react";
import MapWrapper from "@/components/Driver/MapWrapper";

type Coordinates = {
  lat: number;
  lon: number;
};

export default function Driver() {
  const [hoveredSpotId, setHoveredSpotId] =
    React.useState<string | null>(null);

  const [destination, setDestination] = React.useState("");
  const [coordinates, setCoordinates] =
    React.useState<Coordinates | null>(null);

  const {
    data: favorites = [],
    refetch,
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
    error: errorFavorites,
  } = useFavorites();

  const {
    data: parkingSpots = [],
    isLoading,
    isError,
    error,
  } = useParkingSpots();

  const handleFavorites = async (id: string) => {
    if (favorites.some((favorite) => favorite.id === id)) {
      await removeFavorite(id);
    } else {
      await addFavorites(id);
    }

    await refetch();
  };

  const findCity = async (city: string) => {
    if (!city.trim()) {
      setCoordinates(null);
      return;
    }

    try {
      const params = new URLSearchParams({
        text: city,
        format: "json",
        limit: "1",
        apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_KEY!,
      });

      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?${params}`
      );

      if (!response.ok) {
        throw new Error("Could not find this location");
      }

      const data = await response.json();
      const result = data.results?.[0];

      if (result) {
        setCoordinates({
          lat: result.lat,
          lon: result.lon,
        });
      } else {
        setCoordinates(null);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  React.useEffect(() => {
    if (!destination.trim()) {
      setCoordinates(null);
      return;
    }

    const timeout = setTimeout(() => {
      findCity(destination);
    }, 700);

    return () => clearTimeout(timeout);
  }, [destination]);

  if (isLoading || isLoadingFavorites) return <Loading />;
  if (isError) return <p>{error.message}</p>;
  if (isErrorFavorites) return <p>{errorFavorites.message}</p>;

  const filteredSpots = parkingSpots.filter(
    (item) =>
      !destination.trim() ||
      item.city?.trim().toLowerCase() ===
        destination.trim().toLowerCase()
  );

  return (
    <main className={styles.driverMain}>
      <div className={styles.mapAndInput}>
        <div className={styles.locationInput}>
          <i className="fa-solid fa-location-dot"></i>

          <input
            type="text"
            placeholder="Where are you going?"
            aria-label="Enter city of destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <MapWrapper
          spots={parkingSpots}
          hoveredSpotId={hoveredSpotId}
          destination={destination}
          coordinates={coordinates}
        />
      </div>

      <div className={styles.cards}>
        <p>
          {filteredSpots.length}{" "}
          {filteredSpots.length === 1 ? "spot found" : "spots found"}
        </p>

        <WideCard
          spots={parkingSpots}
          handleFavorites={handleFavorites}
          favorites={favorites}
          onSpotHover={setHoveredSpotId}
          destination={destination}
        />
      </div>

      {parkingSpots.length === 0 && (
        <p>There are no available spots right now!</p>
      )}
    </main>
  );
}
