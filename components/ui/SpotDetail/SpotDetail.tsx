"use client";
import styles from "./spot.module.css";
import SpotPhotos from "./SpotPhotos";
import SpotInfo from "./SpotInfo";
import { ParkingSpot } from "@/types/types";
import SpotAvailability from "./SpotAvailability";
import SpotReviews from "./SpotReviews";
import useCurrentUser from "@/hooks/useCurrentUser";
import BookingForm from "@/components/ui/SpotDetail/BookingForm";

export default function SpotDetail({ spot }: { spot: ParkingSpot }) {
  const { data: user } = useCurrentUser();

  return (
    <div className={user.role === "OWNER" ? styles.layout : styles.layoutDriver}>
      <div className={styles.spotContent}>
        <SpotPhotos spot={spot} />
        <SpotInfo spot={spot} user={user} />
        <SpotAvailability spot={spot} />
        <SpotReviews spot={spot} user={user} />
      </div>
      {user.role !== "OWNER" && <BookingForm spot={spot} />}
    </div>
  );
}
