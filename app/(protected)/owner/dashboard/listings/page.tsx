"use client";
import styles from "./listing.module.css";
import Header from "@/components/Owner/Header";
import useParkingSpots from "@/hooks/useParkingSpots";
import { ParkingSpot } from "@/types/types";
import Link from "next/link";
import Loading from "@/components/Loading";
import reviewAvarage from "@/utils/reviewAvarage";

export default function Listings() {
  const {
    data: parkingSpots = [] as ParkingSpot[],
    refetch,
    isLoading,
    isError,
    error,
  } = useParkingSpots();

  async function updateSpot(id: string, is_active: boolean) {
    const response = await fetch("/api/parkingSpots", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_active }),
    });

    if (!response.ok) {
      alert("Failed to update parking spot");
      return;
    }

    await refetch();
  }

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;

  return (
    <section className={styles.subpage}>
      <Header
        title="Your Listings"
        description={`${parkingSpots?.length ?? 0} listings`}
        buttonText="+ Add a spot"
      />
      <section className={styles.filtersDashboard}>
        <button>All ({parkingSpots?.length ?? 0})</button>
        <button>
          Active ({parkingSpots.filter((spot) => spot.is_active).length})
        </button>
        <button>
          Paused ({parkingSpots.filter((spot) => !spot.is_active).length})
        </button>
      </section>

      <section className={styles.dashboard}>
        {parkingSpots.map((spot) => (
          <Link
            href={`/owner/${spot.id}`}
            className={styles.listedSpots}
            key={spot.id}
          >
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
              <div className={styles.cardTextHeader}>
                <h5>{spot.name}</h5>
                <div className={styles.stars}>
                  {[5, 4, 3, 2, 1].map((num) => (
                    <i
                      key={num}
                      className={
                        spot?.reviews?.length === 0
                          ? "fa-regular fa-star"
                          : `fa-solid fa-star ${
                              num <=
                              Math.round(
                                reviewAvarage({ review: spot?.reviews ?? [] }),
                              )
                                ? styles.active
                                : ""
                            }`
                      }
                    />
                  ))}
                  <p>{`(${spot.reviews.length})`}</p>
                </div>
              </div>

              <p>
                {spot.city} · {spot.spot_type}
              </p>

              <div className={styles.cardPrice}>
                <h5>Price</h5>
                <span>${spot.price_per_hours}/hr</span>
              </div>

              <div className={styles.cardInfo}>
                <p>{spot.description}</p>
              </div>
              <div className={styles.cardButtons}>
                <button
                  onClick={() => updateSpot(spot.id, !spot.is_active)}
                  type="button"
                >
                  {spot.is_active ? "Pause" : "Activate"}
                </button>
              </div>
            </div>
          </Link>
        ))}

        <Link href="/owner/addaspot" className={styles.addSpotDiv}>
          <h5>+</h5>
          <h5>Add a new spot</h5>
        </Link>
      </section>
    </section>
  );
}
