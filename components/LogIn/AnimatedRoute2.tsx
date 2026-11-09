import styles from "./animatedRoute2.module.css"

export default function AnimatedRoute2() {
    return (
        <div className={styles.visualSide}>
            <svg className={styles.routeSvg} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
                aria-hidden="true">
                <path className={styles.routeLine}
                    d="M100 0 L600 800" />
                <path className={styles.routeLine}
                    d="M400 0 L100 800" />
                <circle
                    className={styles.routeDot} cx="287.5" cy="300" r="9" fill="#F5B739"/>
            </svg>
            <div className={styles.routeText}>
                <div className={styles.parkCard}>
                    <div>
                        <span>🅿️</span>
                        <p>12 spots near you right now</p>
                    </div>
                    <p>Book instantly, no calls or waiting.</p>
                </div>
                <h2>
                Find a spot, or rent yours out.    </h2>
                <p>
                   Real-time availability, secure payment, and reviews from real drivers.</p>
            </div>
        </div>
    );
}