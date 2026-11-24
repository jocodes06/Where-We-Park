"use client"
import styles from "./spot.module.css"
import { AddSpotProps } from "@/types/types"
import type { AmenityType } from "@/types/types"

export default function AmenitiesSection({formData, setFormData}: AddSpotProps){

     const amenities: AmenityType[] = [
        { type: "Covered", icon: "🏠" },
        { type: "Handicap accessible", icon: "♿" },
        { type: "Security camera", icon: "📹" },
        { type: "EV charger on-site", icon: "⚡" },
        { type: "Gated entry", icon: "🔒" },
        { type: "Well lit", icon: "💡" },
        { type: "Fenced parking", icon: "🚧" },
        { type: "Motorcycle parking", icon: "🏍️" },
        { type: "Bicycle parking", icon: "🚲" },
        { type: "Oversized vehicle parking", icon: "🚚" },
        { type: "Compact car friendly", icon: "🚗" },
      ];

    return(
          <div className={styles.amenities}>
          <h4>Amenities</h4>
          <div className={styles.amenitiesList}>
            {amenities.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amenities: e.target.checked
                        ? [...prev.amenities, item]
                        : prev.amenities.filter(
                            (amenity) => amenity.type !== item.type,
                          ),
                    }))
                  }
                />
                <h5>{item.type}</h5>
              </div>
            ))}
          </div>
        </div>
    )
}