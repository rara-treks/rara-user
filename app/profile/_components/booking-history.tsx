"use client";
import React from "react";
import BookingCard from "./booking-card";
import useBookingHistory from "@/lib/hooks/use-booking-history";

function BookingHistory() {
  const { bookings, isPending } = useBookingHistory();
  return (
    <section className="flex flex-col gap-5">
      {isPending && Array.from({ length: 2 }).map((_, index) => <BookingCard key={`loading-${index}`} loading />)}
      {bookings?.stays_and_reviews.map((stay) => (
        <BookingCard key={stay.booking_id} data={stay} />
      ))}
      {bookings?.stays_and_reviews.length === 0 && (
        <div className="w-full h-full flex justify-center items-center py-5">No Bookings Found</div>
      )}
    </section>
  );
}

export default BookingHistory;
