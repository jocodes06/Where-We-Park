"use client";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <section className={styles.loading}>
       <div className={styles.spinner}></div>
    </section>
  );
}
