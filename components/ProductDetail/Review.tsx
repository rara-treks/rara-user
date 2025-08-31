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

  // Extract title and reviews from data
  let title: string = "";
  let reviews: ReviewType[] = [];

  // Handle different data formats
  if (Array.isArray(data)) {
    // If data is directly an array of reviews
    reviews = data;
  } else if (data && typeof data === "object") {
    // If data is an object with title and reviews
    title = data.title || "";
    reviews = data.reviews || [];

    // If the object itself contains review properties, treat it as reviews array
    if (!data.reviews && Object.keys(data).some((key) => key !== "title")) {
      // Convert object to array format if needed
      reviews = Object.values(data).filter(
        (item) => typeof item === "object" && item !== null && "name" in item
      ) as ReviewType[];
    }
  }

  // Log title to console (keeping it safe as requested)
  useEffect(() => {
    if (title) {
      console.log("Review Component Title:", title);
    }
  }, [title]);

  // Handle review submission
  const handleReviewSubmit = (reviewData: ReviewData) => {
    console.log("Review submitted:", reviewData);
    console.log("Trek title:", title);
  };

  // Handle opening the review dialog
  const handleWriteReviewClick = () => {
    setIsDialogOpen(true);
  };

  // Handle closing the review dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle case where reviews might be undefined or empty
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
