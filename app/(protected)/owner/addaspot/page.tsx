"use client";
import styles from "./addspot.module.css";
import Link from "next/link";
import React from "react";
import AddSpot from "@/components/ui/Owner/AddASpotForm/AddSpot";
import type { parkingSpotForm } from "@/types/types";


export default function addASpot() {

  const [formData, setFormData] = React.useState<parkingSpotForm>({
    name: "",
    address: "",
    spotType: "",
    pricePerHour: 0,
    pricePerDay: 0,
    availability: [
      { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "Tuesday", isOpen: true, openTime: "", closeTime: "" },
      { day: "Wednesday", isOpen: true, openTime: "", closeTime: "" },
      { day: "Thursday", isOpen: true, openTime: "", closeTime: "" },
      { day: "Friday", isOpen: true, openTime: "", closeTime: "" },
      { day: "Saturday", isOpen: false, openTime: "", closeTime: "" },
      { day: "Sunday", isOpen: false, openTime: "", closeTime: "" },
    ],
    amenities: [],
    photos: [],
    description: "",
    latitude:"",
    longitude:""
  });



  return (
    <section className={styles.addASpotMain}>
      <header>
        <div>
          <Link href="/owner/dashboard/listings" aria-label="Close and return to listings">
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </Link>
          <h1>WhereWePark</h1>
        </div>
      </header>
       <AddSpot formData={formData} setFormData={setFormData}/>
    </section>
  );
}
