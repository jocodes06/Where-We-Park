"use client";
import styles from "./spot.module.css";
import { ParkingSpot } from "@/types/types";
import type { User } from "@/types/types";

export default function SpotReviews({
  spot,
  user,
}: {
  spot: ParkingSpot;
  user: User;
}) {
  console.log(spot.reviews);

  return (
    <>
      <div className={styles.section}>
          <h3>{`Reviews (${spot?.reviews.length})`}</h3>
          {spot.reviews.length != 0 ? (
            <div className={styles.reviews}>
              {spot?.reviews.map((review) => (
                <div className={styles.review} key={review.driver_id}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}>
                      {review.host_name.charAt(0)}
                    </div>
                    <div className={styles.reviewUser}>
                      <h3>{review.host_name}</h3>
                      <span>Oct 6, 2026</span>
                    </div>
                  </div>
                  <div
                    className={styles.reviewStars}
                    aria-label={`${review.stars} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fa-solid fa-star ${
                          star <= review.stars ? styles.active : ""
                        }`}
                      />
                    ))}
                  </div>

                  <div className={styles.reviewTags}>
                    {review.tags.map((tag) => (
                      <span key={tag.id}>{tag.tag}</span>
                    ))}
                  </div>
                  <h4 className={styles.reviewDescription}>
                    {review.description}
                  </h4>
                </div>
              ))}
            </div>
          ): (
            <p>There are no reviews yet!</p>
          )}
        </div>

      {user.role === "DRIVER" && (
        <div className={styles.section}>
          <h3>Hosted by</h3>
          <div className={styles.hostCard}>
            <span className={styles.av}>{spot?.host_name.charAt(0)}</span>
            <div>
              <b>{spot?.host_name}</b>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
