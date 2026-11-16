"use client";
import styles from "./review.module.css";
import { useParams } from "next/navigation";
import useBookingRequests from "@/hooks/useBookingRequests";
import Link from "next/link";
import React from "react";
import AddReview from "@/lib/addReview";
import type { Review } from "@/types/types";
import { useRouter } from "next/navigation";

export default function LeaveReview() {
  const router = useRouter();
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useBookingRequests();
  const { id } = useParams<{ id: string }>();
  const booking = bookings.find((item) => item.id === id);
  const today = new Date();

  const [reviewForm, setReviewForm] = React.useState<Review>({
    lot_id: "",
    stars: 0,
    tags: [],
    description: "",
  });

  console.log(reviewForm);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!booking) return;

    try {
      await AddReview({ ...reviewForm, lot_id: booking.lot_id });
      router.push("/driver/dashboard")
    } catch (error) {
      console.error("Review submission failed:", error);
    }
  };

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
                <label>DATE</label>
                <span>
                  {new Date(booking.booking_date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className={styles.detail}>
                <label>TIME</label>
                <span>
                  {booking.start_time.slice(0, 5)}–{" "}
                  {booking.end_time.slice(0, 5)}{" "}
                </span>
              </div>
              <div className={styles.detail}>
                <label>DURATION</label>
                <span>{Number(booking.duration_hours).toFixed(0)} hours</span>
              </div>
              <div className={styles.detail}>
                <label>TOTAL PAID</label>
                <span>${booking.parking_cost}</span>
              </div>
            </div>
          </div>
        </aside>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>How was your stay?</h3>

          <div className={styles.stars}>
            {[5, 4, 3, 2, 1].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={reviewForm.stars === star}
                  onChange={() =>
                    setReviewForm((prev) => ({ ...prev, stars: star }))
                  }
                />
                <label htmlFor={`star${star}`} aria-label={`${star} stars`}>
                  ★
                </label>
              </React.Fragment>
            ))}
          </div>

          <h3>What stood out?</h3>
          <div className={styles.chips}>
            {["Easy to find", "Felt safe", "As described", "Helpful host"].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  className={
                    reviewForm.tags.includes(tag) ? styles.selected : ""
                  }
                  onClick={() =>
                    setReviewForm((prev) => ({
                      ...prev,
                      tags: prev.tags.includes(tag)
                        ? prev.tags.filter((t) => t !== tag)
                        : [...prev.tags, tag],
                    }))
                  }
                >
                  {tag}
                </button>
              ),
            )}
          </div>
          <h3>Tell others about it</h3>
          <textarea
            className={styles.textarea}
            placeholder="What was the spot like? Anything future drivers should know?"
            onChange={(e) =>
              setReviewForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          ></textarea>
          <button className={styles.submitBtn} type="submit">
            Submit review
          </button>
        </form>
      </main>
    </section>
  );
}
