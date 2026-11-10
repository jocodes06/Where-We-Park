import styles from "./cards.module.css"
import Link from "next/link";
import { ParkingSpot, FavoriteSpot } from "@/types/types";

type WideCardProps = {
    spots : ParkingSpot[],
    handleFavorites : (id: string) => Promise<void>,
    favorites : FavoriteSpot[]
}

export default function WideCard({spots, handleFavorites, favorites}: WideCardProps){


    return(
        <div className={styles.spotDiv}>
          {spots.map((spot: ParkingSpot) => (
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