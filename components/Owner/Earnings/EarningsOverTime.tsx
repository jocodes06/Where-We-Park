"use client"
import styles from "../ownerComp.module.css"

export default function EarningsOverTime(){
    return(
        <section className={styles.earningsOverTime}>
            <div className={styles.earningsDiv}>
                <h4>Earnings over time</h4>
                <div>
                    <h5>7d</h5>
                    <h5>30d</h5>
                    <h5>Year</h5>
                </div>
            </div>
        </section>
    )
}