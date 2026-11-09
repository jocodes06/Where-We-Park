"use client";
import React from "react";
import styles from "./page.module.css";
import Hero from "@/components/Home/Hero";
import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import Modal from "@/components/Home/Modal";
import {isModalOpen} from "../components/Contexts/ModalContext"
import Link from "next/link";


export default function Home() {

  const {openModal, setOpenModal} = React.useContext(isModalOpen);

  return (
    <>
    <main className={`${styles.home} ${openModal ? styles.pageblur : ""}`}>
      <header>
        <h1>WhereWePark</h1>
        <div>
          <Link href="/login" className={styles.logInButton}>Log In</Link>
          <Link href="/signup" className={styles.signUpButton}>Sign Up</Link>
        </div>
      </header>
      <Hero />
      <Features />
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
      <Footer />
    </main>
    {openModal && <Modal/>}
    </>
  );
}
