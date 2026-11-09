"use client";
import React from "react";
import styles from "./driver.module.css";
import Header from "@/components/Header";



export default function DriverDashboard({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <main className={styles.ownerMain}>
      <Header/>
      {children}
    </main>
  );
}
