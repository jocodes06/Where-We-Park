"use client"
import styles from "../ownerComp.module.css"

type Payouts = {
    name: string,
    date: string,
    price:string,
}[]


export default function Booking(){
    

    const payouts : Payouts = [{
      name: "Next payout",
      date: "Oct 1",
      price: "$214.00",
    },
    {
      name: "Last payout",
      date: "Sep 24",
      price: "$188.50",
    },
   

    ] 


    return(
        <section className={styles.payouts}>
                            <div className={styles.payoutDiv}>
                                <h4>Payouts</h4>
                                <span>Payment settings</span>
                            </div>
                            {payouts.map((item, index) => (
                                <div key={index} className={styles.payoutDiv}>
                                    <h5>{item.name}  · {item.date}</h5>
                                    <h5>{item.price}</h5>
                                </div>
                            ))}
                            <div className={styles.payoutDiv}>
                                <h5>Total this year</h5>
                                <h5>$3,940.00</h5>
                            </div>
                            
        </section>
    )
}