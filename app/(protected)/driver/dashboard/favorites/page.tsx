"use client";
import styles from "./favorites.module.css";
import useFavorites from "@/hooks/useFavorites";
import Loading from "@/components/Loading";

export default function Favorites() {
  const {
    data: favoriteSpots = [],
    isLoading,
    isError,
    error,
  } = useFavorites();

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;



  return (
    <main className={styles.favorites}>
      {favoriteSpots.map((spot) => (
        <div className={styles.favoriteSpots} key={spot.id}>
          <div className={styles.cardImage}>
            <img
              src={spot.photos[0].photo_url}
              alt={`${spot.address} parking spot`}
            />
            <span className={styles.activeStatus}>
              {spot.is_active ? "Active" : "Paused"}
            </span>
          </div>

          <div className={styles.cardText}>
            <h5>{spot.address}</h5>
            <p>
              {spot.city} · {spot.spot_type}
            </p>
            <div className={styles.cardPrice}>
              <h5>Price</h5>
              <p><span>${spot.price_per_hours}</span>/hr</p>
            </div>
              <button>Book now</button>
          </div>
        </div>
      ))}
      {favoriteSpots.length === 0 &&
      <p>You currently don't have any favorite spots!</p>}
    </main>
  );
}
