"use client"
import React from "react"
import { useParams } from "next/navigation"
import styles from "./spot.module.css"
import Link from "next/link"
import { requestBooking } from "@/lib/bookRequest"
import useFavorites from "@/hooks/useFavorites"
import { addFavorites } from "@/lib/driver-favorites"
import { removeFavorite } from "@/lib/remove-favorite"
import type { Booking } from "@/types/types"
import type { ParkingSpot } from "@/types/types"
import type { AmenityType } from "@/types/types"
import type { Weekday } from "@/types/types"
import useParkingSpots from "@/hooks/useParkingSpots"
import useCurrentUser from "@/hooks/useCurrentUser"


export default function spotDetail() {
  
  const {data : favorites = [],refetch} = useFavorites();
  const {data : parkingSpots = [], isLoading, isError, error } = useParkingSpots()

  const {data: user} = useCurrentUser()
  const { id } = useParams<{ id: string }>()

  const spot = parkingSpots.find((spot:ParkingSpot) => spot.id === id)

  const today = new Date();

  const formattedDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-")

  const day = today.getDay() - 1;
  const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const todayDay = weekday.find((name, index) => index === day)

  const [bookings, setBookings] = React.useState<Booking>({
    id: "",
    booking_date: formattedDate,
    duration_type: "hourly",
    duration_hours: 1,
    start_time: "14:00",
    end_time: "15:00",
    parking_cost: 0,
    service_fee: 0,
    total_amount: 0,
  })


  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const start = e.target.value;

    setBookings((prev) => ({
      ...prev,
      start_time: start,
      end_time: `${String(
        (Number(start.slice(0, 2)) + prev.duration_hours) % 24
      ).padStart(2, "0")}:${start.slice(3, 5)}`,
    }));
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const end = e.target.value;

    const startHour = Number(bookings.start_time.slice(0, 2));
    const endHour = Number(end.slice(0, 2));

    setBookings((prev) => ({
      ...prev,
      end_time: end,
      duration_hours: (endHour - startHour + 24) % 24,
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const duration = Number(e.target.value);

    setBookings((prev) => ({
      ...prev,
      duration_hours: duration,
      duration_type: duration === 24 ? "all_day" : "hourly",
      end_time: `${String(
        (Number(prev.start_time.slice(0, 2)) + duration) % 24
      ).padStart(2, "0")}:${prev.start_time.slice(3, 5)}`,
    }));
  };

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submited");

    if (!spot) {
      alert("Spot not found");
      return;
    }

    const parking_cost = spot.price_per_hours * bookings.duration_hours
    const service_fee = parking_cost * 0.25
    const total_amount = parking_cost + service_fee

    try {
      const result = await requestBooking({
        ...bookings,
        id: spot.id,
        parking_cost,
        service_fee,
        total_amount
      })

      alert("Booking request sent successfully!");
    } catch (error) {
      console.error(error);
      alert(
        "failed"
      )
    }
  }

  const handleFavorites = async (id: string) => {
    try{
    if(favorites.some(favorite => favorite.id ===id)){
      await removeFavorite(id),
      refetch();
    }
    else{
      await addFavorites(id),
      refetch();
    }}
    catch(error){
      console.log("Error updating favorites:", error);
    }
  }


  if(isLoading) return <p>Is loading...</p>
  if(isError) return <p>{error.message}</p>

  return (
    <section className={styles.spotPage}>
      <header>
        <Link href={"/driver/dashboard"}>
          <div>
            <i className="fa-solid fa-arrow-left-long"></i>
            <h5>Back to Search</h5>
          </div>
        </Link>
        <div>
          <i className="fa-solid fa-bell"></i>
          <h5 id={styles.userLetter}>{user?.first_name.charAt(0)}</h5>
        </div>
      </header>

      <div className={spot?.photos?.length === 1 ? styles.galleryOne :
        spot?.photos?.length === 2 ? styles.galleryTwo : styles.gallery}>
        {spot?.photos?.map((item :{id:string, photo_url : string}) => (
          Number(item.id) === 0 ? (
            <div className={spot?.photos.length === 1 ? styles.galleryMainOne : styles.galleryMain} key={item.id}>
              <img src={item.photo_url} alt="" />
            </div>
          ) : (
            <div className={styles.galleryThumb} key={item.id}>
              <img src={item.photo_url} alt="" />
            </div>
          )
        ))}
      </div>

      <div className={styles.layout}>
        <div>
          <div className={styles.titleRow}>
            <h1>{spot?.name}</h1>
            <button className={styles.favBtn} aria-label="Save"
             onClick={()=> {if(spot) handleFavorites(spot.id)}}>
              <i className={favorites.some(favorite => favorite.id ===spot?.id) ?
                "fa-solid fa-heart" :  "fa-regular fa-heart"}
             ></i>
            </button>
          </div>

          <div className={styles.metaLine}>
            <span className={styles.dotSep}>{spot?.city}, {spot?.address}</span>
          </div>

          <div className={styles.tags}>
            {spot?.amenities?.map((item:AmenityType) => (
              <span key={item.type} className={styles.tagPill}>{item.type}</span>
            ))}
          </div>

          <div className={styles.section}>
            <h3>About this spot</h3>
            <p>{spot?.description}</p>
          </div>

          <div className={styles.section}>
            <h3>Amenities</h3>
            <div className={styles.amenityList}>
              {spot?.amenities?.map((item:AmenityType) => (
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

              {
                spot?.availability?.filter((item:Weekday) => item.isOpen).map((item:Weekday) => (
                  item.day === todayDay ? (
                    <div className={`${styles.hoursRow} ${styles.hoursRowToday}`} key={item.day}>
                      <span>{item.day}</span>
                      <span>{item.openTime.slice(0, 5)} – {item.closeTime.slice(0, 5)}</span>
                    </div>
                  ) :
                    (
                      <div className={styles.hoursRow} key={item.day}>
                        <span>{item.day}</span>
                        <span>{item.openTime.slice(0, 5)} – {item.closeTime.slice(0, 5)}</span>
                      </div>
                    )
                ))
              }
              {spot?.availability?.filter((item:Weekday) => item.isOpen === false).map((item:Weekday) => (
                <div className={`${styles.hoursRow} ${styles.hoursRowClosed}`} key={item.day}>
                  <span>{item.day}</span><span>Closed</span>
                </div>
              ))}

            </div>
          </div>


          <div className={styles.section}>
            <h3>Location</h3>
            <p>{spot?.address}, {spot?.city}</p>
          </div>

          <div className={styles.section}>
            <h3>Hosted by</h3>
            <div className={styles.hostCard}>
              <span className={styles.av}>{spot?.host_name.charAt(0)}</span>
              <div>
                <b>{spot?.host_name}</b>
              </div>
            </div>
          </div>
        </div>

        {/* booking - section */}


        {spot &&
          <form className={styles.bookPanel} onSubmit={handleSubmit}>
            <div className={styles.bookPrice}>${spot?.price_per_hours}
              <small>/hr</small>
            </div>
            <div className={styles.bookGrid}>
              <div className={styles.bookFieldRow}>
                <div className={styles.bookField}>
                  <label htmlFor="date">Date</label>
                  <input id="date" type="date" value={bookings.booking_date} 
                    onChange={(e) => setBookings(prev => ({ ...prev, booking_date: e.target.value }))} />
                </div>
                <div className={styles.bookField}>
                  <label htmlFor="dur">Duration</label>
                  <select
                    id="dur"
                    value={String(bookings.duration_hours)}
                    onChange={handleDurationChange}>

                    <option value="1">1 hour</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                    <option value="24">All day</option>
                  </select>
                </div>
              </div>

              <div className={styles.bookFieldRow}>
                <div className={styles.bookField}>
                  <label htmlFor="start">Start time</label>
                  <input id="start" type="time" value={bookings.start_time}
                    onChange={handleStartChange} />
                </div>
                <div className={styles.bookField}>
                  <label htmlFor="end">End time</label>
                  <input id="end" type="time" value={bookings.end_time}
                    onChange={handleEndChange} />
                </div>
              </div>
            </div>

            <div className={styles.availNote}>
              <i className="fa-solid fa-circle-check"></i> Available for your selected time
            </div>

            <div className={styles.costBreakdown}>
              <div className={styles.row}><span>${spot?.price_per_hours} × {bookings.duration_hours} hours</span>
                <span>$ {spot?.price_per_hours * bookings.duration_hours}</span></div>
              <div className={styles.row}>
                <span>Service fee</span><span>$ {spot?.price_per_hours * bookings.duration_hours * 0.25}</span></div>
              <div className={`styles.row ${styles.total}`}>
                <span>Total</span>
                <span>$
                  {(spot?.price_per_hours * bookings.duration_hours +
                    spot?.price_per_hours * bookings.duration_hours * 0.25).toFixed(2)}
                </span></div>
            </div>

            <button className={styles.btnWide} type="submit">Request to book</button>
          </form>}

      </div >
    </section >
  )
}