"use client";
import styles from "./spot.module.css";
import { AddSpotProps } from "@/types/types";

export default function PricingSection({
  formData,setFormData}: AddSpotProps) {
  return (
    <div className={styles.pricing}>
      <h4>Pricing</h4>
      <div>
        <div className={styles.pricesDiv}>
          <label htmlFor="priceperhour">Price per hour</label>
          <div className={styles.priceInput}>
            <i className="fa-solid fa-dollar-sign"></i>
            <input
              type="number"
              required
              id="priceperhour"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pricePerHour: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
        <div className={styles.pricesDiv}>
          <label htmlFor="priceperday">Price per day</label>
          <div className={styles.priceInput}>
            <i className="fa-solid fa-dollar-sign"></i>
            <input
              type="number"
              required
              id="priceperday"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pricePerDay: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
      </div>
      <p>WhereWePark takes a 12% service fee, shown to drivers at checkout.</p>
    </div>
  );
}
