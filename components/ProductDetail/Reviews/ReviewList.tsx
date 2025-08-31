"use client";

import ReviewCard from "./ReviewCard";
import { Review } from "./types";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="hidden md:flex w-full items-start gap-4 overflow-x-auto">
      {reviews.map((review, index) => (
        <ReviewCard key={review.id || index} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
