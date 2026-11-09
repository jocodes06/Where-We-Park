"use client"
import EarningsOverTime from "@/components/Owner/Earnings/EarningsOverTime";
import styles from "../owner.module.css"
import Header from "@/components/Owner/Header"
import EarningByListings from "@/components/Owner/Earnings/EarningsByListings";
import PayoutEarnings from "@/components/Owner/Earnings/PayoutEarnings";


type Earnings = {
    title: string,
    info: string,
    obs: string,
}[];


export default function Earnings(){

      const earningsStats: Earnings = [{
        title: "This month's earnings",
        info: "$612",
        obs: "↑ 18% vs last month"

    },
    {
        title: "Next payout · Oct 1",
        info: "$214",
        obs: "Scheduled"
    },
    {
        title: "Total this year",
        info: "$3,940",
        obs: "Since Jan"
    },
    {
        title: "Avg. per booking",
        info: "$19",
        obs: "↑ $2 vs last month"
    },
    ]


    return(
         <section className={styles.subpage}>
            <Header title="Earnings"
            description="Track income across all your listings"
            buttonText="Payment settings"/>
            <section className={styles.statsDashboard}>
                {earningsStats.map((item, index) => (
                    <div key={index}>
                        <p>{item.title}</p>
                        <h2>{item.info}</h2>
                        <span>{item.obs}</span>
                    </div>
                ))}
            </section>
            <section className={styles.dashboard}>
                <EarningsOverTime/>
                <EarningByListings/>
                <PayoutEarnings/>
            </section>
         </section>




    )
}