import styles from "./comp.module.css"
import { ParkingSpot } from "@/types/types";
import Loading from "@/components/Loading";
import { addFavorites } from "@/lib/driver-favorites";
import useFavorites from "@/hooks/useFavorites";
import { removeFavorite } from "@/lib/remove-favorite";
import Link from "next/link";

type SpotCardProps = {
    parkingSpots : ParkingSpot[];
}

export default function SpotCard({parkingSpots}:SpotCardProps){
    
      const { data: favorites = [], refetch, isLoading, isError, error} = useFavorites();
    
      const handleFavorites = async (id: string) => {
        if (favorites.some((favorite) => favorite.id === id)) {
          await removeFavorite(id);
          refetch();
        } else {
          await addFavorites(id);
          refetch();
        }
      };

      if(isLoading) return <Loading/>
      if(isError) return <p>{error.message}</p>

    return(
        <div className={styles.spotDiv}>
          {parkingSpots.map((spot: ParkingSpot) => (
            <Link href={`/driver/spotDetail/${spot.id}`} key={spot.id} className={styles.spot}>
                <div>
                  <div className={styles.photoContainer}>
                    <img
                      src={spot.photos?.[0]?.photo_url}
                      alt={`${spot.address} parking spot`}
                    />
                    <button type="button" className={styles.toggleFavorite} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleFavorites(spot.id);
                      }}>
                    <i
                      className={
                        favorites.some((item) => item.id === spot.id)
                          ? `fa-solid fa-heart ${styles.heart}`
                          : `fa-regular fa-heart ${styles.heart}`
                      }
                    />
                    </button>
                  </div>
                  <div className={styles.spotInfo}>
                    <h4>{spot.name}</h4>
                    <h5>
                      {spot.address} • {spot.city}
                    </h5>
                    <div className={styles.amenitiesDiv}>
                      {spot.amenities?.map((item, index) => (
                        <div key={index}>
                          <p>{item.type}</p>
                        </div>
                      ))}
                    </div>
                    <span>{spot.is_active && "✓ Available now"}</span>
                  </div>
                </div>
                <h5>
                  <span>${spot.price_per_hours}</span>/hr
                </h5>
            </Link>
          ))}
        </div>
    )
}