"use client";

import { useEffect, useState } from "react";
import TrekReviewDialog from "./ReviewPopup";
import ReviewList from "./Reviews/ReviewList";
import EmptyReviewState from "./Reviews/EmptyReviewState";
import ReviewCarousel from "./Reviews/ReviewCarousel";
import ReviewHeader from "./Reviews/ReviewHeader";
import { Review as ReviewType, ReviewData, ReviewProps } from "./Reviews/types";


const Review = ({ data }: ReviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  let title: string = "";
  let reviews: ReviewType[] = [];

  if (Array.isArray(data)) {
    reviews = data;
  } else if (data && typeof data === "object") {
    title = data.title || "";
    reviews = data.reviews || [];

    if (!data.reviews && Object.keys(data).some((key) => key !== "title")) {
      reviews = Object.values(data).filter(
        (item) => typeof item === "object" && item !== null && "name" in item
      ) as ReviewType[];
    }
  }

  useEffect(() => {
    if (title) {
      console.log("Review Component Title:", title);
    }
  }, [title]);

  const handleReviewSubmit = (reviewData: ReviewData) => {
    console.log("Review submitted:", reviewData);
    console.log("Trek title:", title);
  };

  const handleWriteReviewClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  if (!reviews || reviews.length === 0) {
    return (
      <EmptyReviewState
        title={title}
        isDialogOpen={isDialogOpen}
        onWriteReviewClick={handleWriteReviewClick}
        onCloseDialog={handleCloseDialog}
        onSubmit={handleReviewSubmit}
      />
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 mb-6">
      <ReviewHeader onWriteReviewClick={handleWriteReviewClick} />

      {/* Mobile Carousel */}
      <ReviewCarousel reviews={reviews} />

      {/* Desktop List */}
      <ReviewList reviews={reviews} />

      {/* Review Dialog */}
      <TrekReviewDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        trekTitle={title}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default Review;
