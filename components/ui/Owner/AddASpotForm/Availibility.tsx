"use client"
import styles from "./spot.module.css"
import { AddSpotProps } from "@/types/types"

export default function Availibility({formData,setFormData}:AddSpotProps){


    return(
         <div className={styles.availabilty}>
          <h4>Availibility</h4>
          <p>Set hours for each day, or turn a day off entirely.</p>
          <div className={styles.availabiltyList}>
            {formData.availability.map((item, index) => {
              if (item.isOpen) {
                return (
                  <div className={styles.availabiltyDiv} key={index}>
                    <div>
                      <h4>{item.day}</h4>
                      <div className={styles.timeDiv}>
                        <input
                          type="time"
                          required
                          value={item.openTime}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              availability: prev.availability.map((day) =>
                                day.day === item.day
                                  ? { ...day, openTime: e.target.value }
                                  : day,
                              ),
                            }))
                          }
                        />
                        <p>-</p>
                        <input
                          type="time"
                          required
                          value={item.closeTime}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              availability: prev.availability.map((day) =>
                                day.day === item.day
                                  ? { ...day, closeTime: e.target.value }
                                  : day,
                              ),
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        defaultChecked
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            availability: prev.availability.map((day) =>
                              day.day === item.day
                                ? { ...day, isOpen: false }
                                : day,
                            ),
                          }))
                        }
                      />
                      <p>Open</p>
                    </div>
                  </div>
                );
              }
              return (
                <div className={styles.availabiltyDivClosed} key={index}>
                  <div>
                    <h4>{item.day}</h4>
                    <p>Closed</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          availability: prev.availability.map((day) =>
                            day.day === item.day
                              ? { ...day, isOpen: true }
                              : day,
                          ),
                        }))
                      }
                    />
                    <p>Open</p>
                  </div>
                </div>
              );
            })}
          </div>
          <h5
            onClick={() => {
              const monday = formData.availability.find(
                (day) => day.day === "Monday",
              );
              if (!monday) return;
              setFormData((prev) => ({
                ...prev,
                availability: prev.availability.map((day) =>
                  day.isOpen
                    ? {
                        ...day,
                        openTime: monday.openTime,
                        closeTime: monday.closeTime,
                      }
                    : day,
                ),
              }));
            }}
          >
            Copy Monday's hours to all weekdays
          </h5>
        </div>
    )

}