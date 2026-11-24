"use client";
import styles from "./spot.module.css";
import { ParkingSpot } from "@/types/types";
import reviewAvarage from "@/utils/reviewAvarage";
import { AmenityType } from "@/types/types";
import type { User } from "@/types/types";
import useFavorites from "@/hooks/useFavorites";
import { addFavorites } from "@/lib/driverFavorites";
import { removeFavorite } from "@/lib/removeFavorite";

export default function SpotInfo({
  spot,
  user,
}: {
  spot: ParkingSpot;
  user: User;
}) {
  const avg = reviewAvarage({ review: spot?.reviews ?? [] });
  const { data: favorites = [], refetch } = useFavorites();

  const handleFavorites = async (id: string) => {
    try {
      if (favorites.some((favorite) => favorite.id === id)) {
        (await removeFavorite(id), refetch());
      } else {
        (await addFavorites(id), refetch());
      }
    } catch (error) {
      console.log("Error updating favorites:", error);
    }
  };

  return (
    <>
      <div className={styles.titleRow}>
        <div>
          <h1>{spot?.name}</h1>
          <div className={styles.stars}>
            <div
              aria-label={
                spot?.reviews?.length
                  ? `${avg.toFixed(1)} out of 5 stars`
                  : "No ratings yet"
              }
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={
                    !spot?.reviews?.length
                      ? "fa-regular fa-star"
                      : `fa-solid fa-star ${
                          star <= Math.round(avg) ? styles.active : ""
                        }`
                  }
                />
              ))}
            </div>
            <p aria-label={`${spot?.reviews?.length ?? 0} reviews`}>
              ({spot?.reviews?.length ?? 0})
            </p>
          </div>
        </div>
        {user.role === "DRIVER" && (
          <button
            className={styles.favBtn}
            aria-label="Save"
            onClick={() => {
              if (spot) handleFavorites(spot.id);
            }}
          >
            <i
              className={
                favorites.some((favorite) => favorite.id === spot?.id)
                  ? "fa-solid fa-heart"
                  : "fa-regular fa-heart"
              }
            ></i>
          </button>
        )}
      </div>

      <div className={styles.metaLine}>
        <span className={styles.dotSep}>
          {spot?.address}
        </span>
      </div>

      <div className={styles.tags}>
        {spot?.amenities?.map((item: AmenityType) => (
          <span key={item.type} className={styles.tagPill}>
            {item.type}
          </span>
        ))}
      </div>

      <div className={styles.section}>
        <h3>About this spot</h3>
        <p>{spot?.description}</p>
      </div>

      <div className={styles.section}>
        <h3>Amenities</h3>
        <div className={styles.amenityList}>
          {spot?.amenities?.map((item: AmenityType) => (
            <div key={item.type}>
              <span className={styles.amenityIc}>{item.icon}</span>
              {item.type}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h3>Location</h3>
        <p>
          {spot?.address}
        </p>
      </div>
    </>
  );
}
