import { IconStarFilled } from "@tabler/icons-react";
import React from "react";

interface Props {
  averageRating: number;
  totalRatings: number;
}

function RatingPreview({ averageRating, totalRatings }: Props) {
  return (
    <div className="flex items-center gap-1 md:gap-2 font-bebas-neue">
      <IconStarFilled className="text-primary w-4 h-4 md:w-6 md:h-6 " />
      <p className="md:text-lg">
        <b className="text-black">{averageRating}</b>/5 ({totalRatings})
      </p>
    </div>
  );
}

export default RatingPreview;
