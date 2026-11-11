"use client";
import styles from "../owner.module.css";
import Header from "@/components/Owner/Header";
import { updateBookingStatus } from "@/lib/updateBookingStatus";
import {BookingRequest} from "@/types/types"

import useBookingRequests from "@/hooks/useBookingRequests"

export default function Bookings() {
  

  const {data : bookingRequests = [], refetch} = useBookingRequests();

  const today = new Date();
  today.setHours(0, 0, 0, 0);


  return (
    <section className={styles.subpage}>
      <section className={styles.bookingsDashboard}>
        <h4>NEEDS YOUR RESPONSE</h4>
        {bookingRequests.map(
          (item) =>
            item.status === "pending" && (
              <div className={styles.bookingDiv} key={item.id}>
                <div className={styles.bookingDivLeft}>
                  <div>
                    <h3>{item.driver_first_name.charAt(0)}</h3>
                    <div>
                      <h5>
                        {item.driver_first_name} {item.driver_last_name}
                      </h5>
                      <p>{item.lot_name}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.bookingDivRight}>
                  <div>
                    <div>
                      <h5>
                        {new Date(item.booking_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </h5>
                      <p>
                        {item.start_time.slice(0, 5)} -{" "}
                        {item.end_time.slice(0, 5)}
                      </p>
                    </div>
                    <p className={styles.pending}>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </p>
                  </div>
                  <h5>{Number(item.parking_cost).toFixed(0)}$</h5>
                  <div className={styles.buttonsDiv}>
                    <button
                      onClick={async () => {
                         await updateBookingStatus(item.id, "declined");
                         await refetch();
                      }}
                    >
                      Decline
                    </button>
                    <button
                      className={styles.acceptButton}
                      onClick={async () => {
                        await updateBookingStatus(item.id, "approved");
                        await refetch();
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ),
        )}
        {!bookingRequests.some((item) => item.status === "pending") && (
          <p>You currently have no pending requests!</p>
        )}

        <h4>UPCOMING</h4>
        {bookingRequests.map(
          (item) =>
            item.status === "approved" &&
            new Date(item.booking_date) >= new Date(today.toString()) && (
              <div className={styles.bookingDiv} key={item.id}>
                <div className={styles.bookingDivLeft}>
                  <div>
                    <h3>{item.driver_first_name.charAt(0)}</h3>
                    <div>
                      <h5>
                        {item.driver_first_name} {item.driver_last_name}
                      </h5>
                      <p>{item.lot_name}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.bookingDivRight}>
                  <div>
                    <div>
                      <h5>
                        {new Date(item.booking_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </h5>
                      <p>
                        {item.start_time.slice(0, 5)} -{" "}
                        {item.end_time.slice(0, 5)}
                      </p>
                    </div>
                    <p className={styles.pending}>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </p>
                  </div>
                  <h5>{Number(item.parking_cost).toFixed(0)}$</h5>
                  <div className={styles.buttonsDiv}>
                    <button
                      className={styles.cancel}
                      onClick={async () => {
                        await updateBookingStatus(item.id, "declined");
                        await refetch();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ),
        )}
        {!bookingRequests.some((item) => item.status === "approved" &&
        new Date(item.booking_date) >= new Date(today.toString()) ) &&
         (
          <p>You currently have no upcoming reservation!</p>
        )}

        <h4>PAST</h4>
        {bookingRequests.map(
          (item) =>
            item.status === "approved" &&
            new Date(item.booking_date) < new Date(today.toString()) && (
              <div className={styles.bookingDiv} key={item.id}>
                <div className={styles.bookingDivLeft}>
                  <div>
                    <h3>{item.driver_first_name.charAt(0)}</h3>
                    <div>
                      <h5>
                        {item.driver_first_name} {item.driver_last_name}
                      </h5>
                      <p>{item.lot_name}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.bookingDivRight}>
                  <div>
                    <div>
                      <h5>
                        {new Date(item.booking_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </h5>
                      <p>
                        {item.start_time.slice(0, 5)} -{" "}
                        {item.end_time.slice(0, 5)}
                      </p>
                    </div>
                    <p className={styles.pending}>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </p>
                  </div>
                  <h5>{Number(item.parking_cost).toFixed(0)}$</h5>
                </div>
              </div>
            ),
        )}
        {!bookingRequests.some(
          (item) =>
            item.status === "approved" &&
            new Date(item.booking_date) < new Date(today.toString()),
        ) && <p>You have no past bookings!</p>}
      </section>
    </section>
  );
}
