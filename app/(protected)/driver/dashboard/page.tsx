"use client";
import styles from "./driver.module.css";
import useParkingSpots from "@/hooks/useParkingSpots";
import Loading from "@/components/Loading";
import SpotCard from "../components/spots-card";


export default function Driver() {
  const {
    data: parkingSpots = [],
    isLoading,
    isError,
    error,
  } = useParkingSpots();

  if (isLoading) return <Loading/>;
  if (isError) return <p>{error.message}</p>;


  return (
    <main className={styles.driverMain}>
      <SpotCard parkingSpots={parkingSpots}/>
      {parkingSpots.length === 0 && (
        <p>There are no available spots right now!</p>
      )}
    </main>
  );
}
