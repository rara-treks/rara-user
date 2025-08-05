import React, { useState } from "react";
import { IconStarFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Props {
  rating: number;
  onRatingSelected: (rating: number) => void;
}

function RateStars({ rating, onRatingSelected }: Props) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;
        return (
          <div
            key={value}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onRatingSelected(value);
                setHoveredRating(0);
              }
            }}
          >
            <button
              value={value.toString()}
              className="px-[6px] outline-none focus-visible:ring-4 focus-visible:ring-blue-400/50"
              onFocus={() => setHoveredRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onBlur={() => setHoveredRating(0)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => {
                onRatingSelected(value);
                setHoveredRating(0);
              }}
            >
              <IconStarFilled
                className={cn(
                  "size-8",
                  value <= (hoveredRating || rating)
                    ? "fill-neutral-950 dark:fill-zinc-100 stroke-neutral-950 dark:stroke-zinc-100"
                    : "fill-neutral-200 dark:fill-neutral-700 stroke-neutral-200 dark:stroke-neutral-700"
                )}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default RateStars;
