"use client";
import React from "react";
import styles from "./home.module.css";
import { isModalOpen } from "../Contexts/ModalContext";

export default function Hero() {
  const { openModal, setOpenModal } = React.useContext(isModalOpen);

  return (
    <section className={styles.homeHero}>
      <h1>Find a parking spot before you leave the house.</h1>
      <p>
        Book driveways, garages and lots near you. Or earn money from the space
        you're not using.
      </p>
      <div className={styles.heroButtons}>
        <div className={styles.parkingSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            name=""
            id=""
            placeholder="Cheap covered parking near the stadium tomorrow"
          />
          <button
            className={styles.createTripButton}
            onClick={() => setOpenModal(true)}
            type="button"
          >
            Search
          </button>
        </div>
        <div className={styles.featureButtons}>
          <button type="button">Covered</button>
          <button type="button">Under 5 € / hour</button>
        </div>
      </div>
    </section>
  );
}
