import styles from "./home.module.css";

export default function Steps() {
  return (
    <section className={styles.homeStartTrip}>
      <h2>Three steps to parked.</h2>
      <p>No setup. Name the trip, invite your group, and start adding stops.</p>
      <section>
        <div>
          <span>1</span>
          <h3>Search</h3>
          <p>Enter where and when, or describe it in your own words.</p>
        </div>
        <div>
          <span>2</span>
          <h3>Book</h3>
          <p>Compare spots, check reviews, pay securely.</p>
        </div>
        <div>
          <span>3</span>
          <h3>Park</h3>
          <p>Show your QR pass and drive in.</p>
        </div>
      </section>
    </section>
  );
}
