"use client";
import React from "react";
import styles from "./spot.module.css";
import { AddSpotProps } from "@/types/types";

type Suggestion = {
  name?: string;
  street?: string;
  city?: string;
  country?: string;
  latitude: number;
  longitude: number;
  housenumber?:string,
};

export default function LocationSection({
  formData,
  setFormData,
}: AddSpotProps) {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);

  React.useEffect(() => {
    if (formData.address.length < 3) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch("/api/geocode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: formData.address }),
        });

        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.log(error);
      }
    });
  }, [formData.address]);

  return (
    <div className={styles.location}>
      <h4>Location</h4>
      <p>Only the approximate area shows until a booking is confirmed.</p>
      <label htmlFor="name">Spot name</label>
      <input
        type="text"
        name="name"
        id="name"
        required
        placeholder="Covered outdoor spot"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <label htmlFor="address">Address</label>
      <div className={styles.addressWrapper}>
      <input
        type="text"
        placeholder="Str. Regele Ferdinand 12, Cluj-Napoca"
        required
        id="address"
        value={formData.address}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            address: e.target.value,
          }))
        }
      />
      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  address: [item.name, item.street,item.country,item.housenumber]
                    .filter(Boolean)
                    .join(", "),
                  city:[item.city],
                  latitude: String(item.latitude),
                  longitude: String(item.longitude),
                }));

                setSuggestions([]);
              }}
            >
              {[item.name, item.street, item.city, item.country, item.housenumber]
                .filter(Boolean)
                .join(", ")}
            </button>
          ))}
        </div>
      )}
      </div>

    </div>
  );
}
