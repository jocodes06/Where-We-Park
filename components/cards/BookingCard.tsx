import styles from "@/app/(protected)/driver/dashboard/bookings/booking.module.css";
import type { BookingRequest } from "@/types/types";
import type { UseMutationResult } from "@tanstack/react-query";
import Link from "next/link";

type BookingCard = {
  booking: BookingRequest;
  cancelMutation?: UseMutationResult<unknown, Error, string>;
};

export default function BookingCard({ booking, cancelMutation }: BookingCard) {
  const today = new Date();

  return (
    <article className={styles.card} key={booking.id}>
      <img src={booking.photos[0]} alt="Parking Spots preview picture" />
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h5>{booking.lot_name}</h5>
          <span className={`${styles.status} ${styles.pending}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
        <p className={styles.when}>Tue, Oct 6 · 9:00 AM – 1:00 PM</p>
        <p className={styles.meta}>{booking.address}</p>
      </div>
      <div className={styles.side}>
        <span className={styles.price}>${booking.parking_cost}</span>
        {booking.status === "pending" ? (
          <button
            className={styles.cancel}
            type="button"
            onClick={() => cancelMutation?.mutate(booking.id)}
          >
            Cancel request
          </button>
        ) : booking.status === "approved" ? (
          new Date(booking.booking_date) >= today ? (
            <button className={styles.cancel} type="button">
              View Booking
            </button>
          ) : (
            <div className={styles.buttons}>
              <Link href={`/driver/review/${booking.id}`}
              className={styles.review}>
                Leave a review
              </Link>
              <button
                className={styles.cancel}
                type="button"
                id="delete-button"
                onClick={() => cancelMutation?.mutate(booking.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          )
        ) : null}
      </div>
    </article>
  );
}
