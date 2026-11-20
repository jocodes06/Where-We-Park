"use client";
import styles from "./spot.module.css";
import { Weekday } from "@/types/types";
import { ParkingSpot } from "@/types/types";

export default function SpotAvailability({ spot }: { spot: ParkingSpot }) {
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
  return (
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
  );
}
