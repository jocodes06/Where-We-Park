"use client";
import styles from "./booking.module.css";
import useBookingRequests from "@/hooks/useBookingRequests";
import Loading from "@/components/Loading";

export default function MyBookings() {
  const today = new Date();
  const { data: bookingRequests = [], isLoading, isError, error } = useBookingRequests();

  if(isLoading) return <Loading/>
  if(isError) return <p>{error.message}</p>

  return (
      <main className={styles.content}>
        <h4>Waiting on host</h4>
        {bookingRequests.map(
          (booking) =>
            booking.status === "pending" && (
              <article className={styles.card} key={booking.id}>
                <img src={booking.photos[0]} alt="" />
                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <h5>{booking.lot_name}</h5>
                    <span className={`${styles.status} ${styles.pending}`}>
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                  <p className={styles.when}>Tue, Oct 6 · 9:00 AM – 1:00 PM</p>
                  <p className={styles.meta}>
                    {booking.address} · Request sent 2 hours ago
                  </p>
                </div>
                <div className={styles.side}>
                  <span className={styles.price}>${booking.parking_cost}</span>
                  <button className={styles.cancel} type="button">
                    Cancel request
                  </button>
                </div>
              </article>

            ),
        )}
        {!bookingRequests.some(
          (booking) => booking.status === "pending",
        ) && <p>You don't have any pending requests!</p>}

        <h4>Upcoming</h4>
        {bookingRequests.map(
          (booking) =>
            booking.status === "approved" &&
            new Date(booking.booking_date) >= today && (
              <article className={styles.card} key={booking.id}>
                <img src={booking.photos[0]} alt="" />
                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <h5>{booking.lot_name}</h5>
                    <span className={`${styles.status} ${styles.confirmed}`}>
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                  <p className={styles.when}>Mon, Oct 5 · 1:00 PM – 4:00 PM</p>
                  <p className={styles.meta}>
                    Str. Regele Ferdinand · Ref PS-48213
                  </p>
                </div>
                <div className={styles.side}>
                  <span className={styles.price}>${booking.parking_cost}</span>
                  <button className={styles.viewBooking} type="button">
                    View booking
                  </button>
                </div>
              </article>
            ),
        )}
        {!bookingRequests.some(
          (booking) =>
            booking.status === "approved" &&
            new Date(booking.booking_date) >= today,
        ) && <p>You don't have any approved requests!</p>}
        <h4>Declined</h4>
        {bookingRequests.map(
          (booking) =>
            booking.status === "declined" && (
              <article className={styles.card} key={booking.id}>
                <img src={booking.photos[0]} alt="" />
                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <h5>{booking.lot_name}</h5>
                    <span className={`${styles.status} ${styles.completed}`}>
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                  <p className={styles.when}>
                    {new Date(booking.booking_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      },
                    )}{" "}
                    · {Number(booking.duration_hours).toFixed(0)} hours
                  </p>
                  <p className={styles.meta}>{booking.address}</p>
                </div>
                <div className={styles.side}>
                  <span className={styles.price}>${booking.parking_cost}</span>
                </div>
              </article>
            ),
        )}
      </main>
  );
}
