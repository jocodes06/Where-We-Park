"use client";
import styles from "./spot.module.css";
import { useParams } from "next/navigation";
import Link from "next/link";
import useParkingSpot from "@/hooks/useParkingSpots";
import Loading from "@/components/Loading";
import SpotDetail from "@/components/ui/SpotDetail/SpotDetail";

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
  if(!spot) return <p>NO spot</p>
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
          <SpotDetail spot={spot}/>
    </main>
  );
}
