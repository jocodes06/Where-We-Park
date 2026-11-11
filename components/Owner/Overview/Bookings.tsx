"use client"
import styles from "../ownerComp.module.css"
import { updateBookingStatus } from "@/lib/updateBookingStatus";
import {BookingRequest} from "@/types/types"
import Link from "next/link";




import useBookingRequests from "@/hooks/useBookingRequests"

export default function Booking() {

    const {data : bookingRequests = [], refetch } = useBookingRequests()

    
    const today = new Date();

    const pendingRequests = bookingRequests.filter(
   (item:BookingRequest) => item.status === "pending" && new Date(item.booking_date) >= today);


    return (
        <section className={styles.bookings}>
            <div className={styles.bookingDiv}>
                <h4>Booking requests</h4>
                <Link href="/owner/dashboard/bookings">See all</Link>
            </div>
            {pendingRequests.length > 0 ? 
            (pendingRequests.map((item:BookingRequest) => 
                (
                <div key={item.id} className={styles.bookingDiv}>
                    <img src={item.photos?.[0]} alt="" />
                    <div>
                        <div className={styles.bookingInfo}>
                            <h5>{item.driver_first_name} {item.driver_last_name}</h5>
                            <p>{item.address}</p>
                        </div>
                        <div className={styles.bookingButtons}>
                            <button
                                className={styles.declineButton}
                                onClick={
                                    async () => {
                                        await updateBookingStatus(item.id, "declined");
                                        await refetch();
                                    }}>
                                Decline
                            </button>
                            <button className={styles.acceptButton}
                            onClick={
                                async () => {

                                    await updateBookingStatus(item.id, "approved");
                                    await refetch();
                            }}>Accept</button>
                        </div>
                    </div>
                </div>
                ))):(
                    <p className={styles.noRequests}>You currently don't have any requests!</p>
                )}
        </section>
    )
}