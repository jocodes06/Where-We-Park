import styles from "@/components/cards/cards.module.css";



export default function SuccessCard() {
  return (
    <div className={styles.successCard}>
      <div className={styles.successIcon}>
        <i className="fa-solid fa-check"></i>
      </div>
      <h3>Your booking request was sent. The host will reply soon.</h3>
    </div>
  );
}
