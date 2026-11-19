"use client";
import styles from "./spot.module.css";
import { useParams } from "next/navigation";
import type { AmenityType } from "@/types/types";
import type { Weekday } from "@/types/types";
import Link from "next/link";
import useParkingSpot from "@/hooks/useParkingSpots";
import Loading from "@/components/Loading";
import reviewAvarage from "@/utils/reviewAvarage";

export default function OwnerSpot() {
  const {
    data: parkingSpot = [],
    isLoading,
    isError,
    error,
  } = useParkingSpot();

  const { id } = useParams<{ id: string }>();
  const spot = parkingSpot.find((item) => item.id === id);

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;

  const today = new Date();
  const day = today.getDay() - 1;
  const weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const todayDay = weekday.find((name, index) => index === day);
  const avg = reviewAvarage({ review: spot?.reviews ?? [] });

  return (
    <main className={styles.ownerSpot}>
      <header>
        <Link href={"/owner/dashboard/listings"}>
          <div>
            <i className="fa-solid fa-arrow-left-long"></i>
            <h5>Back</h5>
          </div>
        </Link>
      </header>

      <div className={styles.layout}>
        <div
          className={
            spot?.photos?.length === 1
              ? styles.galleryOne
              : spot?.photos?.length === 2
                ? styles.galleryTwo
                : styles.gallery
          }
        >
          {spot?.photos?.map((item: { id: string; photo_url: string }) =>
            Number(item.id) === 0 ? (
              <div
                className={
                  spot?.photos.length === 1
                    ? styles.galleryMainOne
                    : styles.galleryMain
                }
                key={item.id}
              >
                <img src={item.photo_url} alt="" />
              </div>
            ) : (
              <div className={styles.galleryThumb} key={item.id}>
                <img src={item.photo_url} alt="" />
              </div>
            ),
          )}
        </div>
        
        <div className={styles.titleRow}>
          <div>
            <h1>{spot?.name}</h1>
            <div className={styles.stars}>
              <div aria-label={spot?.reviews?.length ? `${avg.toFixed(1)} out of 5 stars` : "No ratings yet"
                }
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star} className={!spot?.reviews?.length
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
        </div>

        <div className={styles.metaLine}>
          <span className={styles.dotSep}>
            {spot?.city}, {spot?.address}
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
          <h3>Availability</h3>
          <div className={styles.hoursTable}>
            {spot?.availability
              ?.filter((item: Weekday) => item.isOpen)
              .map((item: Weekday) =>
                item.day === todayDay ? (
                  <div
                    className={`${styles.hoursRow} ${styles.hoursRowToday}`}
                    key={item.day}
                  >
                    <span>{item.day}</span>
                    <span>
                      {item.openTime.slice(0, 5)} – {item.closeTime.slice(0, 5)}
                    </span>
                  </div>
                ) : (
                  <div className={styles.hoursRow} key={item.day}>
                    <span>{item.day}</span>
                    <span>
                      {item.openTime.slice(0, 5)} – {item.closeTime.slice(0, 5)}
                    </span>
                  </div>
                ),
              )}
            {spot?.availability
              ?.filter((item: Weekday) => item.isOpen === false)
              .map((item: Weekday) => (
                <div
                  className={`${styles.hoursRow} ${styles.hoursRowClosed}`}
                  key={item.day}
                >
                  <span>{item.day}</span>
                  <span>Closed</span>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Location</h3>
          <p>
            {spot?.address}, {spot?.city}
          </p>
        </div>

        {spot?.reviews.length != 0 && (
          <div className={styles.section}>
            <h3>{`Reviews (${spot?.reviews.length})`}</h3>
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
          </div>
        )}
      </div>
    </main>
  );
}
