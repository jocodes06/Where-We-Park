"use client";
import React from "react";
import styles from "./page.module.css";
import Hero from "@/components/Home/Hero";
import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import Modal from "@/components/Home/Modal";
import { isModalOpen } from "../components/Contexts/ModalContext";
import Link from "next/link";
import Steps from "@/components/Home/Steps";


export default function Home() {
  const { openModal, setOpenModal } = React.useContext(isModalOpen);

  return (
    <>
      <main className={`${styles.home} ${openModal ? styles.pageblur : ""}`}>
        <header>
          <h1>WhereWePark</h1>
          <div>
            <Link href="/login" className={styles.logInButton}>
              Log In
            </Link>
            <Link href="/signup" className={styles.signUpButton}>
              Sign Up
            </Link>
          </div>
        </header>
        <Hero />
        <Features role={"owner"} />
        <Features role={"driver"} />
        <Steps/>
        <Footer />
      </main>
      {openModal && <Modal />}
    </>
  );
}
