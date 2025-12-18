import React from "react";

interface AvailabilityBannerProps {
  availableSeats?: string;
  date?: string;
}

const AvailabilityBanner = ({
  availableSeats,
  date,
}: AvailabilityBannerProps) => {
  if (!availableSeats || !date) {
    return null;
  }

  const seats = parseInt(availableSeats, 10);

  if (isNaN(seats) || seats >= 5) {
    return null;
  }

  return (
    <div className="px-2 border-red-200">
      <p className="text-sm text-red-500 font-medium">
        {seats} seats available
      </p>
    </div>
  );
};

export default AvailabilityBanner;
