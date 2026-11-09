"use client"
import styles from "../owner.module.css"
import Header from "@/components/Owner/Header"


type Review = {
    star: string,
    total: number,
}[]

type personalReview = {
    name: string,
    date: string,
    review: string,
    parkingLot: string,
    stars: string,
}[]

export default function Reviews() {

    const reviews: Review = [{
        star: "5 ★",
        total: 25
    },
    { star: "4 ★", total: 4 },
    { star: "3 ★", total: 2 },
    { star: "2 ★", total: 1 },
    { star: "1 ★", total: 0 },]



    const personalReview = [
        {
            name: "ionel ion",
            date: "Sep 22, 2026",
            review: "Super easy check-in, spot was exactly as described and right by the entrance. Would book again.",
            parkinLot: "Downtown covered garage",
            stars: "★★★★★"

        }
    ]

    const totalReviews = reviews.reduce(
        (sum, review) => sum + review.total,
        0
    );

    return (
        <section className={styles.subpage}>
            <Header title="Reviews"
                description="What drivers are saying about your spots" />
            <section className={styles.reviewsDashboard}>
                <div className={styles.allReviews}>
                    <div>
                        <h2>4.8</h2>
                        <h5>★★★★★</h5>
                        <p>32 reviews</p>
                    </div>
                    <div className={styles.reviewBreakdown}>
                        {reviews.map((review) => {
                            const percentage =
                                totalReviews > 0
                                    ? (review.total / totalReviews) * 100
                                    : 0;

                            return (
                                <div
                                    className={styles.reviewRow}
                                    key={review.star}
                                >
                                    <span>{review.star}</span>

                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progress}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>

                                    <span>{review.total}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <section className={styles.filtersDashboard}>
                    <button>All listings</button>
                    <button>Downtown garage</button>
                    <button>Driveway near mall</button>
                </section>
                <section className={styles.reviews}>
                    {personalReview.map((item,index) => (
                        <div className={styles.reviewDiv}>
                            <div key={index}>
                                <div className={styles.reviewLeft}>
                                <h3>{item.name.charAt(0).toUpperCase()}</h3>
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>{item.date}</p>
                                </div>
                                </div>
                                <h4>{item.stars}</h4>
                            </div>
                            <p>{item.parkinLot}</p>
                            <h5>{item.review}</h5>
                            <button>Reply</button>
                        </div>
                    ))}
                </section>
            </section>
        </section>


    )
}