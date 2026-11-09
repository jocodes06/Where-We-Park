"use client";
import styles from "./owner.module.css"
import Listings from "@/components/Owner/Overview/Listings"
import Booking from "@/components/Owner/Overview/Bookings"
import Header from "@/components/Owner/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import Loading from "@/components/Loading";
import useParkingSpots from "@/hooks/useParkingSpots";


type Stat = {
    title: string,
    info: string,
    obs: string,
}[]


export default function Overview() {

    const {data : parkingSpots=[],
        isLoading : spotLoading,
        isError : spotError,
        error: spotErrorMessage,
    } = useParkingSpots()

    const {data : user,isLoading, isError, error} = useCurrentUser()

    const stats: Stat = [
    {
        title: "Active listings",
        info: `${parkingSpots.length}`,
        obs: `${parkingSpots.filter((item => item.is_active!==true)).length} paused`
    }
    ]

    if(isLoading || spotLoading) return <Loading/>
    if(isError) return <p>{error.message}</p>
    if(spotError) return <p>{spotErrorMessage.message}</p>



    return (
        <section className={styles.subpage}>
            <Header title={`Welcome back, ${user?.first_name}`}
                description="Here's how your spots are doing this week."
                buttonText="+ Add a spot" />
            <section className={styles.statsDashboard}>
                {stats.map((item, index) => (
                    <div key={index}>
                        <p>{item.title}</p>
                        <h2>{item.info}</h2>
                        <span>{item.obs}</span>
                    </div>
                ))}
            </section>
            <section className={styles.dashboard}>
                <Listings />
                <Booking />
            </section>
        </section>
    )
}