"use client";
import styles from "./driver.module.css";
import useParkingSpots from "@/hooks/useParkingSpots";
import Loading from "@/components/Loading";
import { addFavorites } from "@/lib/driver-favorites";
import useFavorites from "@/hooks/useFavorites";
import { removeFavorite } from "@/lib/remove-favorite";
import WideCard from "@/components/cards/WideCard";

export default function Driver() {

  const {
    data: favorites = [],
    refetch,
    isLoading: isLoadingFavorites,
    isError : isErrorFavorites,
    error : errorFavorites,
  } = useFavorites();

  const handleFavorites = async (id: string) => {
    if (favorites.some((favorite) => favorite.id === id)) {
      await removeFavorite(id);
      refetch();
    } else {
      await addFavorites(id);
      refetch();
    }
  };

  const {
    data: parkingSpots = [],
    isLoading,
    isError,
    error,
  } = useParkingSpots();


  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;
  if (isLoadingFavorites) return <Loading />;
  if (isErrorFavorites) return <p>{errorFavorites.message}</p>;

  return (
    <main className={styles.driverMain}>
      <WideCard spots={parkingSpots} handleFavorites={handleFavorites} favorites={favorites}/>
      {parkingSpots.length === 0 && (
        <p>There are no available spots right now!</p>
      )}
    </main>
  );
}
