"use client"
import styles from "../ownerComp.module.css"
import type { ParkingSpot } from "@/types/types";
import useParkingSpots from '@/hooks/useParkingSpots'
import Link from "next/link";


export default function Listings() {

    const {data : parkingSpots = [], refetch} = useParkingSpots();


    return (
        <section className={styles.listings}>
            <div className={styles.listingDiv}>
                <h4>Your listings</h4>
                <Link href="/owner/dashboard/listings">Manage all</Link>
            </div>
            {parkingSpots?.map((item:ParkingSpot) => (
                <div key={item.id} className={styles.listingDiv}>
                    <img
                                src={item.photos[0].photo_url}
                                alt={`${item.address} parking spot`}
                    />
                    <div>
                        <div className={styles.listingInfo}>
                            <h5>{item.address}</h5>
                            <p>{item.city}</p>
                        </div>
                        <div className={styles.listingPrices}>
                            <span> {item.is_active ? "Active" : "Paused"}</span>
                            <h5>${item.price_per_hours}/hr</h5>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}