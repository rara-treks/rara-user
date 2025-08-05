import { cn } from "@/lib/utils";
import { IconStarFilled } from "@tabler/icons-react";
import React, { useState } from "react";

interface Props {
  rating: number;
  onRatingSelected: (rating: number) => void;
  disabled?: boolean;
}

function RateStars({ rating, onRatingSelected, disabled }: Props) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index: number) => {
        const value = index + 1;
        return (
          <button
            type="button"
            key={value}
            value={value.toString()}
            className="outline-none"
            onFocus={() => !disabled && setHoveredRating(value)}
            onMouseEnter={() => !disabled && setHoveredRating(value)}
            onBlur={() => !disabled && setHoveredRating(0)}
            onMouseLeave={() => !disabled && setHoveredRating(0)}
            onClick={() => {
              !disabled && onRatingSelected(value);
              !disabled && setHoveredRating(0);
            }}
          >
            <IconStarFilled
              name="star"
              className={cn("size-5", value <= (hoveredRating || rating) ? "fill-primary" : "fill-neutral-200")}
            />
          </button>
        );
      })}
    </div>
  );
}

export default RateStars;
