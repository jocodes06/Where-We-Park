"use client"
import styles from "../ownerComp.module.css"




export default function Earning(){
    

    return(
        <section className={styles.earnings}>
            <div className={styles.earningDiv}>
                <h4>Earnings, last 7 days</h4>
                <span>View earnings</span>
            </div>
        </section>
    )
}