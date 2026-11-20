"use client";
import styles from "./spot.module.css";
import type { ParkingSpot } from "@/types/types";

export default function SpotPhotos({ spot }: { spot: ParkingSpot }) {
  return (
    <div
      className={spot?.photos?.length === 1 ? styles.galleryOne : spot?.photos?.length === 2
            ? styles.galleryTwo : styles.gallery}
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
  );
}
