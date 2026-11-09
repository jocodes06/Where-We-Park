"use client"
import styles from "../ownerComp.module.css"

export default function PayoutEarnings() {
    return (
        <section className={styles.earningsOverTime}>
            <h4>Payout history</h4>
            <table>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>METHOD</th>
                        <th>STATUS</th>
                        <th>AMOUNT</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Oct 1, 2026</td>
                        <td>Bank ····4417</td>
                        <td>
                            <h5 className={styles.pending}> Pending</h5>
                            </td>
                        <td>$214.00</td>
                    </tr>

                    <tr>
                        <td>Sep 24, 2026</td>
                        <td>Bank ····4417</td>
                        <td>
                        <h5 className={styles.paid}> Pending</h5>
                        </td>
                        <td>$188.50</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}