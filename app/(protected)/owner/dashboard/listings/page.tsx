"use client";
import styles from "../owner.module.css";
import Header from "@/components/Owner/Header";
import useParkingSpots from "@/hooks/useParkingSpots";
import { ParkingSpot } from "@/types/types";
import Link from "next/link";


export default function Listings() {

    const {data: parkingSpots = [] as ParkingSpot [], refetch,isLoading,isError,error} = useParkingSpots()

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

    if(isLoading) return <p>It is loading...</p>
    if(isError) return <p>{error.message}</p>



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
                    Active (
                    {parkingSpots.filter((spot) => spot.is_active).length}
                    )
                </button>
                <button>
                    Paused (
                    {parkingSpots.filter((spot) => !spot.is_active).length}
                    )
                </button>
            </section>
            <section className={styles.dashboard}>
                {parkingSpots.map((spot) => (
                    <div className={styles.listedSpots} key={spot.id}>
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
                                <p>${spot.price_per_hours}/hr</p>
                            </div>

                            <div className={styles.cardInfo}>
                                <p>{spot.description}</p>
                            </div>
                            <div className={styles.cardButtons}>
                                <button onClick={() => updateSpot(spot.id, !spot.is_active)} type="button">
                                    {spot.is_active ? "Pause" : "Activate"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <Link href="/owner/addaspot" className={styles.addSpotDiv} >
                    <h5>+</h5>
                    <h5>Add a new spot</h5>
                </Link>
            </section>
        </section>
    );
}