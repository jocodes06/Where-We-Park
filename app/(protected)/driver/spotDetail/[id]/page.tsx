"use client"
import { useParams } from "next/navigation"
import styles from "./spot.module.css"
import Link from "next/link"
import type { ParkingSpot } from "@/types/types"

import useParkingSpots from "@/hooks/useParkingSpots"
import useCurrentUser from "@/hooks/useCurrentUser"

import SpotDetail from "@/components/ui/SpotDetail/SpotDetail"

export default function spotDetail() {
  

  const {data : parkingSpots = [], isLoading, isError, error } = useParkingSpots()
  const {data: user} = useCurrentUser()
  const { id } = useParams<{ id: string }>()

  const spot = parkingSpots.find((spot:ParkingSpot) => spot.id === id)

  if(isLoading) return <p>Is loading...</p>
  if(isError) return <p>{error.message}</p>

  if(!spot) return <p>No spot</p>

  return (
    <section className={styles.spotPage}>
      <header>
        <Link href={"/driver/dashboard"}>
          <div>
            <i className="fa-solid fa-arrow-left-long"></i>
            <h5>Back</h5>
          </div>
        </Link>
        <div>
          <i className="fa-solid fa-bell"></i>
          <h5 id={styles.userLetter}>{user?.first_name.charAt(0)}</h5>
        </div>
      </header>

      <SpotDetail spot={spot}/>
    </section >
  )
}