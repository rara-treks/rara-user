import { cn } from "@/lib/utils";
import { IconStarFilled } from "@tabler/icons-react";
import React from "react";

interface Props {
  rating: number;
  className?: string;
}

function RatingStars({ rating, className }: Props) {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating - fullStars > 0;

  return (
    <div className="flex gap-x-[2px]">
      <svg
        aria-hidden="true"
        className="absolute size-0 [--star-inversed:#f99518] [--star-quarternary:gray]"
        focusable="false"
      >
        <linearGradient id="half-star-gradient">
          <stop offset="0%" stopColor="var(--star-inversed)" />
          <stop offset="50%" stopColor="var(--star-inversed)" />
          <stop offset="50%" stopColor="var(--star-quarternary)" />
          <stop offset="100%" stopColor="var(--star-quarternary)" />
        </linearGradient>
      </svg>
      {Array.from(new Array(5)).map((star, index) => {
        const starIndex = index + 1;
        const isFullStar = starIndex <= fullStars;
        const isHalfStar = starIndex === fullStars + 1 && hasHalfStar;

        return (
          <IconStarFilled
            key={index}
            className={cn(
              "size-3",
              isFullStar && "fill-primary",
              isHalfStar && "fill-[url(#half-star-gradient)] stroke-[url(#half-star-gradient)]",
              !isFullStar &&
                !isHalfStar &&
                "fill-neutral-200 dark:fill-neutral-700 stroke-neutral-200 dark:stroke-neutral-700",
              className
            )}
          />
        );
      })}
    </div>
  );
}

export default RatingStars;
