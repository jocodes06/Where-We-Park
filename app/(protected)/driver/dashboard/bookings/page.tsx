"use client";
import styles from "./booking.module.css";
import useBookingRequests from "@/hooks/useBookingRequests";
import Loading from "@/components/Loading";
import cancelBookRequest from "@/lib/cancelBookRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BookingCard from "@/components/cards/BookingCard";

export default function MyBookings() {
  const today = new Date();
  const {
    data: bookingRequests = [],
    isLoading,
    isError,
    error,
  } = useBookingRequests();

  const queryClient = useQueryClient();
  const cancelMutation = useMutation({
    mutationFn: cancelBookRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["bookingRequests"] }),
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;

  return (
    <main className={styles.content}>
      <h4>Waiting on host</h4>
      {bookingRequests.map(
        (booking) =>
          booking.status === "pending" && (
            <BookingCard
              key={booking.id}
              booking={booking}
              cancelMutation={cancelMutation}
            />
          ),
      )}
      {!bookingRequests.some((booking) => booking.status === "pending") && (
        <p>You don't have any pending requests!</p>
      )}

      <h4>Upcoming</h4>
      {bookingRequests.map(
        (booking) =>
          booking.status === "approved" &&
          new Date(booking.booking_date) >= today && (
            <BookingCard key={booking.id} booking={booking} />
          ),
      )}
      {!bookingRequests.some(
        (booking) =>
          booking.status === "approved" &&
          new Date(booking.booking_date) >= today,
      ) && <p>You don't have any approved requests!</p>}
      <h4>Declined</h4>
      {bookingRequests.map(
        (booking) =>
          booking.status === "declined" && (
            <BookingCard key={booking.id} booking={booking} />
          ),
      )}

      {!bookingRequests.some((booking) => booking.status === "declined") && (
        <p>You don't have any declined requests!</p>
      )}
      <h4>Past Approved Requests</h4>
      {bookingRequests.map(
        (booking) =>
          booking.status === "approved" &&
          new Date(booking.booking_date) < today && (
            <BookingCard
              key={booking.id}
              booking={booking}
              cancelMutation={cancelMutation}
            />
          ),
      )}
      {!bookingRequests.some(
        (booking) =>
          booking.status === "approved" &&
          new Date(booking.booking_date) < today,
      ) && <p>You don't have any past bookings</p>}
    </main>
  );
}
