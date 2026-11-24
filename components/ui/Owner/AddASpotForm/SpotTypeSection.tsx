"use client"
import styles from "./spot.module.css"
import { AddSpotProps } from "@/types/types"
import { AmenityType } from "@/types/types";

export default function SpotTypeSection({formData, setFormData}: AddSpotProps){

     const spots: AmenityType[] = [
        {
          type: "garage",
          icon: "🏢",
        },
        {
          type: "driveway",
          icon: "🏠",
        },
        {
          type: "lot",
          icon: "🅿️",
        },
        {
          type: "ev",
          icon: "⚡",
        },
      ];

    return(
        <div className={styles.spotType}>
          <h4>Spot Type</h4>
          <p>Choose whichever fits best</p>
          <div>
            {spots.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    spotType: item.type.toLowerCase(),
                  }))
                }
              >
                <h5>{item.icon}</h5>
                <h5>{item.type}</h5>
              </button>
            ))}
          </div>
        </div>
    )
}