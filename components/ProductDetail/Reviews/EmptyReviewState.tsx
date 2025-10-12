"use client";

import ReviewHeader from "./ReviewHeader";
import TrekReviewDialog from "../ReviewPopup";
import { ReviewData } from "./types";

interface EmptyReviewStateProps {
  title: string;
  prodId: number; // Changed to number
  isDialogOpen: boolean;
  onWriteReviewClick: () => void;
  onCloseDialog: () => void;
}

const EmptyReviewState = ({
  title,
  prodId,
  isDialogOpen,
  onWriteReviewClick,
  onCloseDialog,
}: EmptyReviewStateProps) => {
  return (
    <div className="w-full flex flex-col gap-4 mb-6">
      <ReviewHeader onWriteReviewClick={onWriteReviewClick} />
      <div className="text-center py-8 text-gray-500">
        No reviews available yet. Be the first to share your experience!
      </div>

      {/* Review Dialog */}
      <TrekReviewDialog
        isOpen={isDialogOpen}
        onClose={onCloseDialog}
        trekTitle={title || "This Trek"}
        prodId={prodId}
      />
    </div>
  );
};

export default EmptyReviewState;
