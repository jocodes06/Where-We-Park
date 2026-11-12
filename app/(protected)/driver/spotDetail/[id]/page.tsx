"use client"
import { useParams } from "next/navigation"
import styles from "./spot.module.css"
import Link from "next/link"
import useFavorites from "@/hooks/useFavorites"
import { addFavorites } from "@/lib/driver-favorites"
import { removeFavorite } from "@/lib/remove-favorite"
import type { ParkingSpot } from "@/types/types"
import type { AmenityType } from "@/types/types"
import type { Weekday } from "@/types/types"
import useParkingSpots from "@/hooks/useParkingSpots"
import useCurrentUser from "@/hooks/useCurrentUser"
import BookingForm from "@/components/Driver/BookingForm/page"


export default function spotDetail() {
  
  const {data : favorites = [],refetch} = useFavorites();
  const {data : parkingSpots = [], isLoading, isError, error } = useParkingSpots()
  const {data: user} = useCurrentUser()
  const { id } = useParams<{ id: string }>()

  const spot = parkingSpots.find((spot:ParkingSpot) => spot.id === id)

  const today = new Date();

 
  const day = today.getDay() - 1;
  const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const todayDay = weekday.find((name, index) => index === day)




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
        <BookingForm spot={spot}/>
      </div >
    </section >
  )
}