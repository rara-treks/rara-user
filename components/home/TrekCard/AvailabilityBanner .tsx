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

  return (
    <div className="px-2 border-red-200">
      <p className="text-sm text-red-500 font-medium">
        {availableSeats} seats available - {date}
      </p>
    </div>
  );
};

export default AvailabilityBanner;
