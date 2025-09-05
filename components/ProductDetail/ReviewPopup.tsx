"use client";
import React, { useState } from "react";
import { Star, Upload, X } from "lucide-react";
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
  overallRating: number;
  cleanliness: number;
  hospitality: number;
  valueForMoney: number;
  communication: number;
  review: string;
  photo: File | null;
}

interface TrekReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trekTitle: string;
  onSubmit: (reviewData: ReviewData) => void;
}

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  label: string;
  hoveredStar: number;
  onHover: (star: number) => void;
  onLeave: () => void;
}

const StarRating = ({
  rating,
  onRatingChange,
  label,
  hoveredStar,
  onHover,
  onLeave,
}: StarRatingProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label} *</label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={onLeave}
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
  onSubmit,
}: TrekReviewDialogProps) => {
  const [reviewData, setReviewData] = useState<ReviewData>({
    name: "",
    overallRating: 0,
    cleanliness: 0,
    hospitality: 0,
    valueForMoney: 0,
    communication: 0,
    review: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [hoveredStars, setHoveredStars] = useState<{
    overall: number;
    cleanliness: number;
    hospitality: number;
    valueForMoney: number;
    communication: number;
  }>({
    overall: 0,
    cleanliness: 0,
    hospitality: 0,
    valueForMoney: 0,
    communication: 0,
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReviewData((prev) => ({ ...prev, photo: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setReviewData((prev) => ({ ...prev, photo: null }));
    setPhotoPreview(null);
  };

  const handleStarHover = (category: string, star: number) => {
    setHoveredStars((prev) => ({ ...prev, [category]: star }));
  };

  const handleStarLeave = (category: string) => {
    setHoveredStars((prev) => ({ ...prev, [category]: 0 }));
  };

  const handleRatingChange = (category: keyof ReviewData, rating: number) => {
    setReviewData((prev) => ({ ...prev, [category]: rating }));
  };

  const handleSubmit = () => {
    if (
      reviewData.name &&
      reviewData.overallRating > 0 &&
      reviewData.cleanliness > 0 &&
      reviewData.hospitality > 0 &&
      reviewData.valueForMoney > 0 &&
      reviewData.communication > 0 &&
      reviewData.review
    ) {
      onSubmit(reviewData);
      // Reset form
      setReviewData({
        name: "",
        overallRating: 0,
        cleanliness: 0,
        hospitality: 0,
        valueForMoney: 0,
        communication: 0,
        review: "",
        photo: null,
      });
      setPhotoPreview(null);
      setHoveredStars({
        overall: 0,
        cleanliness: 0,
        hospitality: 0,
        valueForMoney: 0,
        communication: 0,
      });
      onClose();
    }
  };

  const isFormValid =
    reviewData.name.trim() &&
    reviewData.overallRating > 0 &&
    reviewData.cleanliness > 0 &&
    reviewData.hospitality > 0 &&
    reviewData.valueForMoney > 0 &&
    reviewData.communication > 0 &&
    reviewData.review.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Review for {trekTitle}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Share your experience and help other trekkers
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Photo Upload Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Upload Photo
            </label>
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Review photo"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  onClick={removePhoto}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload photo</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
            )}
          </div>

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

          {/* Individual Rating Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Rate Individual Aspects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StarRating
                rating={reviewData.cleanliness}
                onRatingChange={(rating) =>
                  handleRatingChange("cleanliness", rating)
                }
                label="Cleanliness"
                hoveredStar={hoveredStars.cleanliness}
                onHover={(star) => handleStarHover("cleanliness", star)}
                onLeave={() => handleStarLeave("cleanliness")}
              />

              <StarRating
                rating={reviewData.hospitality}
                onRatingChange={(rating) =>
                  handleRatingChange("hospitality", rating)
                }
                label="Hospitality"
                hoveredStar={hoveredStars.hospitality}
                onHover={(star) => handleStarHover("hospitality", star)}
                onLeave={() => handleStarLeave("hospitality")}
              />

              <StarRating
                rating={reviewData.valueForMoney}
                onRatingChange={(rating) =>
                  handleRatingChange("valueForMoney", rating)
                }
                label="Value for Money"
                hoveredStar={hoveredStars.valueForMoney}
                onHover={(star) => handleStarHover("valueForMoney", star)}
                onLeave={() => handleStarLeave("valueForMoney")}
              />

              <StarRating
                rating={reviewData.communication}
                onRatingChange={(rating) =>
                  handleRatingChange("communication", rating)
                }
                label="Communication"
                hoveredStar={hoveredStars.communication}
                onHover={(star) => handleStarHover("communication", star)}
                onLeave={() => handleStarLeave("communication")}
              />
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
                setReviewData((prev) => ({ ...prev, review: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Share your experience about this trek..."
            />
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            onClick={onClose}
            className="px-4 py-2 text-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-md transition-colors ${
              isFormValid
                ? "bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200 flex items-center gap-2 border-[#71B344] hover:border-[#5A8F37]"
                : "bg-gray-300 text-gray-500 rounded-full cursor-not-allowed"
            }`}
          >
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrekReviewDialog;
