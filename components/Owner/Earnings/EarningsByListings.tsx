"use client"
import styles from "../ownerComp.module.css"


export default function EarningByListings() {
    return (
        <section className={styles.earningsOverTime}>
            <h4>Earnings over time</h4>
            <div className={styles.earningsByDiv}>
                <div>
                    <span></span>
                    <h5>Downtown covered garage</h5>
                </div>
                <div className={styles.right}>
                    <h5>$340</h5>
                    <p>56%</p>
                </div>
            </div>
        </section>
    )
}