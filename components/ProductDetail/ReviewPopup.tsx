"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ReviewData {
  name: string;
  email: string;
  rating: number;
  cleanliness: number;
  hospitality: number;
  value_for_money: number;
  communication: number;
  review: string;
}

interface TrekReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trekTitle: string;
  prodId: number;
}

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  label: string;
}

const StarRating = ({ rating, onRatingChange, label }: StarRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label} *</label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className="transition-colors"
          >
            <Star
              size={24}
              className={`${
                star <= (hoveredStar || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              } hover:text-yellow-400`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating}/5` : ""}
        </span>
      </div>
    </div>
  );
};

const TrekReviewDialog = ({
  isOpen,
  onClose,
  trekTitle,
  prodId,
}: TrekReviewDialogProps) => {
  const [reviewData, setReviewData] = useState<ReviewData>({
    name: "",
    email: "",
    rating: 0,
    cleanliness: 0,
    hospitality: 0,
    value_for_money: 0,
    communication: 0,
    review: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate overall rating automatically
  React.useEffect(() => {
    const ratings = [
      reviewData.cleanliness,
      reviewData.hospitality,
      reviewData.value_for_money,
      reviewData.communication,
    ].filter((r) => r > 0);

    if (ratings.length > 0) {
      const average = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
      setReviewData((prev) => ({
        ...prev,
        rating: Number(average.toFixed(2)),
      }));
    }
  }, [
    reviewData.cleanliness,
    reviewData.hospitality,
    reviewData.value_for_money,
    reviewData.communication,
  ]);

  const handleSubmit = async () => {
    if (
      reviewData.name &&
      reviewData.email &&
      reviewData.cleanliness > 0 &&
      reviewData.hospitality > 0 &&
      reviewData.value_for_money > 0 &&
      reviewData.communication > 0 &&
      reviewData.review
    ) {
      setIsSubmitting(true);
      setError("");

      try {
        const payload = {
          product_id: prodId,
          email: reviewData.email,
          full_name: reviewData.name,
          cleanliness: reviewData.cleanliness,
          hospitality: reviewData.hospitality,
          value_for_money: reviewData.value_for_money,
          communication: reviewData.communication,
          public_review: reviewData.review,
        };

        const response = await fetch("/api/product/profile/add-review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to submit review");
        }

        setShowSuccess(true);
      } catch (err: any) {
        setError(err.message || "Failed to submit review. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCloseDialog = () => {
    setShowSuccess(false);
    setReviewData({
      name: "",
      email: "",
      rating: 0,
      cleanliness: 0,
      hospitality: 0,
      value_for_money: 0,
      communication: 0,
      review: "",
    });
    setError("");
    onClose();
  };

  const isFormValid =
    reviewData.name.trim() !== "" &&
    reviewData.email.trim() !== "" &&
    reviewData.cleanliness > 0 &&
    reviewData.hospitality > 0 &&
    reviewData.value_for_money > 0 &&
    reviewData.communication > 0 &&
    reviewData.review.trim() !== "";

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-green-600">
                Review Submitted Successfully!
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Thank you for sharing your experience with us
              </DialogDescription>
            </DialogHeader>
            <div className="py-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-700 mb-2">
                Your review for <strong>{trekTitle}</strong> has been submitted.
              </p>
              <p className="text-gray-600 text-sm">
                It will be published after verification.
              </p>
            </div>
            <DialogFooter>
              <Button
                onClick={handleCloseDialog}
                className="w-full bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200"
              >
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Review for {trekTitle}
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Share your experience and help other trekkers
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={reviewData.name}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={reviewData.email}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cleanliness Rating */}
                <StarRating
                  rating={reviewData.cleanliness}
                  onRatingChange={(cleanliness) =>
                    setReviewData((prev) => ({ ...prev, cleanliness }))
                  }
                  label="Cleanliness"
                />

                {/* Hospitality Rating */}
                <StarRating
                  rating={reviewData.hospitality}
                  onRatingChange={(hospitality) =>
                    setReviewData((prev) => ({ ...prev, hospitality }))
                  }
                  label="Hospitality"
                />

                {/* Value for Money Rating */}
                <StarRating
                  rating={reviewData.value_for_money}
                  onRatingChange={(value_for_money) =>
                    setReviewData((prev) => ({ ...prev, value_for_money }))
                  }
                  label="Value for Money"
                />

                {/* Communication Rating */}
                <StarRating
                  rating={reviewData.communication}
                  onRatingChange={(communication) =>
                    setReviewData((prev) => ({ ...prev, communication }))
                  }
                  label="Communication"
                />
              </div>

              {/* Overall Rating (Auto-calculated) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Overall Rating (Auto-calculated)
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        className={`${
                          star <= Math.round(reviewData.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {reviewData.rating > 0
                      ? `${reviewData.rating.toFixed(2)}/5`
                      : "0/5"}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Your Review *
                </label>
                <textarea
                  value={reviewData.review}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      review: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Share your experience about this trek..."
                />
              </div>
            </div>

            <DialogFooter className="flex gap-3">
              <Button
                onClick={handleCloseDialog}
                className="px-4 py-2 text-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`px-6 py-2 rounded-md transition-colors ${
                  isFormValid && !isSubmitting
                    ? "bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200 flex items-center gap-2 border-[#71B344] hover:border-[#5A8F37]"
                    : "bg-gray-300 text-gray-500 rounded-full cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrekReviewDialog;
