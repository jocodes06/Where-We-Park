"use client";
import styles from "./review.module.css";
import { useParams } from "next/navigation";
import useBookingRequests from "@/hooks/useBookingRequests";
import Link from "next/link";

export default function LeaveReview() {
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useBookingRequests();
  const { id } = useParams<{ id: string }>();
  const booking = bookings.find((item) => item.id === id);
  const today = new Date();

  if (isLoading) return <p>Loading booking...</p>;
  if (isError) return <p>{error.message}</p>;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Link
          href="/driver/dashboard/bookings"
          className={styles.backBtn}
          aria-label="Go back to bookings page"
        >
          <i className="fa-solid fa-arrow-left-long"></i>
        </Link>
        <h5>Back to bookings</h5>
      </header>

      <main className={styles.layout}>
        <aside className={styles.spotSide}>
          <img
            className={styles.photo}
            src={booking.photos[0]}
            alt={booking.lot_name}
          />

          <div className={styles.spotBody}>
            <div className={styles.titleRow}>
              <h3>{booking?.lot_name}</h3>
              {new Date(booking.booking_date) <= today &&
                booking.status === "approved" && (
                  <span id="completed">Completed</span>
                )}
            </div>
            <p className={styles.address}>
              <i className="fa-solid fa-location-dot"></i>
              {booking.address}
            </p>

            <div className={styles.details}>
              <div className={styles.detail}>
                <label>Date</label>
                <span>
                  {new Date(booking.booking_date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className={styles.detail}>
                <label>Time</label>
                <span>
                  {booking.start_time.slice(0, 5)}–{" "}
                  {booking.end_time.slice(0, 5)}{" "}
                </span>
              </div>
              <div className={styles.detail}>
                <label>Duration</label>
                <span>{Number(booking.duration_hours).toFixed(0)} hours</span>
              </div>
              <div className={styles.detail}>
                <label>Total paid</label>
                <span>${booking.parking_cost}</span>
              </div>
            </div>
          </div>
        </aside>

        <form className={styles.form}>
          <h3>How was your stay?</h3>

          <div className={styles.stars}>
            <input type="radio" id="star5" name="rating" value="5" />
            <label htmlFor="star5" aria-label="5 stars">
              ★
            </label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label htmlFor="star4" aria-label="4 stars">
              ★
            </label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label htmlFor="star3" aria-label="3 stars">
              ★
            </label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label htmlFor="star2" aria-label="2 stars">
              ★
            </label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label htmlFor="star1" aria-label="1 star">
              ★
            </label>
          </div>

          <h3>What stood out?</h3>
          <div className={styles.chips}>
            <input type="checkbox" id="easy" />
            <label htmlFor="easy">Easy to find</label>
            <input type="checkbox" id="safe" />
            <label htmlFor="safe">Felt safe</label>
            <input type="checkbox" id="accurate" />
            <label htmlFor="accurate">As described</label>
            <input type="checkbox" id="host" />
            <label htmlFor="host">Helpful host</label>
          </div>

          <h3>Tell others about it</h3>
          <textarea
            className={styles.textarea}
            placeholder="What was the spot like? Anything future drivers should know?"
          ></textarea>

          <button className={styles.submitBtn} type="submit">
            Submit review
          </button>
        </form>
      </main>
    </section>
  );
}
