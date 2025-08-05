import React from "react";
import RatingStars from "./rating-stars";
import TextWithBrandmark from "@/components/text-with-brandmark";
import formatNumber from "@/lib/utils/format-number";

interface Props {
  averageRating: number;
  totalRatings: number;
  starRatings: {
    [key: string]: number;
  };
}

function RatingSummaryCard({ averageRating, totalRatings, starRatings }: Props) {
  return (
    <div className="border rounded-2xl p-4 w-fit bg-white">
      <div className="relative flex gap-4 xl:gap-12 justify-between items-center">
        <div>
          <TextWithBrandmark className="*:leading-none justify-center" size={100}>
            {averageRating}
          </TextWithBrandmark>
          <p className="text-xs sm:text-sm md:text-base mt-1 text-center">
            Based on {formatNumber(totalRatings)} ratings
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <p className="font-medium whitespace-nowrap">{5 - index} star</p>
                <RatingStars rating={starRatings[(5 - index) as keyof typeof starRatings]} className="md:size-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingSummaryCard;
