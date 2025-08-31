"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Review } from "./types";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <div
      className={`p-6 rounded-2xl text-white flex flex-col gap-3 bg-[#1E2F22] min-w-[280px] md:min-w-0 ${
        review.marginTop || ""
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="rounded-full">
          <Image
            src={review.avatar}
            alt={`${review.name} avatar`}
            width={40}
            height={40}
            className="rounded-full w-20 h-20 object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">{review.name}</span>
          <p className="font-satisfy text-xs text-gray-300">{review.trek}</p>
          <div className="flex items-center gap-1">
            {renderStars(review.rating)}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed">{review.review}</p>
    </div>
  );
};

export default ReviewCard;
