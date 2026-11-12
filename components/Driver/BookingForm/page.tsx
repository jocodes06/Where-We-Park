import styles from "@/app/(protected)/driver/spotDetail/[id]/spot.module.css";
import type { ParkingSpot } from "@/types/types";
import React from "react";
import type { Booking } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { requestBooking } from "@/lib/bookRequest";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";


type bookingFormType = {
  spot: ParkingSpot;
};

export default function BookingForm({ spot }: bookingFormType) {
  const router = useRouter();
  const today = new Date();
  const queryClient = useQueryClient();

  const formattedDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const [bookings, setBookings] = React.useState<Booking>({
    id: "",
    booking_date: formattedDate,
    duration_type: "hourly",
    duration_hours: 1,
    start_time: "14:00",
    end_time: "15:00",
    parking_cost: 0,
    service_fee: 0,
    total_amount: 0,
  });

  const mutation = useMutation({
    mutationFn: requestBooking,
    onSuccess: () => {
      console.log("invalidating")
      queryClient.invalidateQueries({queryKey:["bookingRequests"]})
      router.push("/driver/dashboard/bookings")
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...bookings, id: spot.id });
  };

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const selectedDay = weekdays[new Date(bookings.booking_date).getDay()];

  const dayAvailability = spot.availability.find(
    (item) => item.day === selectedDay && item.isOpen,
  );

  const isDayGood = !!dayAvailability;

  const isTimeGood =
    !!dayAvailability &&
    bookings.start_time >= dayAvailability.openTime.slice(0,5) &&
    bookings.end_time <= dayAvailability.closeTime.slice(0,5);

  return (
    <form className={styles.bookPanel} onSubmit={handleSubmit}>
      <div className={styles.bookPrice}>
        ${spot?.price_per_hours}
        <small>/hr</small>
      </div>

      <div className={styles.bookGrid}>
        <div className={styles.bookFieldRow}>
          <div className={styles.bookField}>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={bookings.booking_date}
              onChange={(e) =>
                setBookings((prev) => ({
                  ...prev,
                  booking_date: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className={styles.bookFieldRow}>
          <div className={styles.bookField}>
            <label htmlFor="start">Start time</label>
            <input
              id="start"
              type="time"
              value={bookings.start_time}
              onChange={(e) =>
                setBookings((prev) => ({
                  ...prev,
                  start_time: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles.bookField}>
            <label htmlFor="end">End time</label>
            <input
              id="end"
              type="time"
              value={bookings.end_time}
              onChange={(e) =>
                setBookings((prev) => ({
                  ...prev,
                  end_time: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>
      {!isDayGood && <p id="error">The spot is not available on this date!</p>}

      {isDayGood && !isTimeGood && (
        <p id="error">The spot is not open at this start time!</p>
      )}

      {isDayGood && isTimeGood && (
        <div className={styles.availNote}>
          <i className="fa-solid fa-circle-check"></i> Available for your
          selected time
        </div>
      )}
      <div className={styles.costBreakdown}>
        <div className={styles.row}>
          <span>
            ${spot?.price_per_hours} × {bookings.duration_hours} hours
          </span>
          <span>$ {spot?.price_per_hours * bookings.duration_hours}</span>
        </div>
        <div className={styles.row}>
          <span>Service fee</span>
          <span>
            $ {spot?.price_per_hours * bookings.duration_hours * 0.25}
          </span>
        </div>
        <div className={`styles.row ${styles.total}`}>
          <span>Total</span>
          <span>
            $
            {(
              spot?.price_per_hours * bookings.duration_hours +
              spot?.price_per_hours * bookings.duration_hours * 0.25
            ).toFixed(2)}
          </span>
        </div>
      </div>

      {dayAvailability && isTimeGood && isDayGood &&
      <button className={styles.btnWide} type="submit">
        Request to book
      </button>
}
    </form>
  );
}
