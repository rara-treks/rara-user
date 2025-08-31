'use client';
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
  rating: number;
  review: string;
  photo: File | null;
}

interface TrekReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trekTitle: string;
  onSubmit: (reviewData: ReviewData) => void;
}

const TrekReviewDialog = ({
  isOpen,
  onClose,
  trekTitle,
  onSubmit,
}: TrekReviewDialogProps) => {
  const [reviewData, setReviewData] = useState<ReviewData>({
    name: "",
    rating: 0,
    review: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

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

  const handleStarClick = (rating: number) => {
    setReviewData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = () => {
    if (reviewData.name && reviewData.rating > 0 && reviewData.review) {
      onSubmit(reviewData);
      // Reset form
      setReviewData({
        name: "",
        rating: 0,
        review: "",
        photo: null,
      });
      setPhotoPreview(null);
      onClose();
    }
  };

  const isFormValid =
    reviewData.name.trim() && reviewData.rating > 0 && reviewData.review.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
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
              Upload Photo (Optional)
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

          {/* Star Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Rating *
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transition-colors"
                >
                  <Star
                    size={32}
                    className={`${
                      star <= (hoveredStar || reviewData.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } hover:text-yellow-400`}
                  />
                </button>
              ))}
            </div>
            {reviewData.rating > 0 && (
              <p className="text-sm text-gray-600">
                {reviewData.rating} out of 5 stars
              </p>
            )}
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