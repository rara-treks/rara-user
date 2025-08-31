"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ReviewHeaderProps {
  onWriteReviewClick: () => void;
}

const ReviewHeader = ({ onWriteReviewClick }: ReviewHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-3xl font-bold">Review</h1>
      <Button
        variant="outline"
        size="sm"
        onClick={onWriteReviewClick}
        className="bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200 flex items-center gap-2 border-[#71B344] hover:border-[#5A8F37]"
      >
        Write Review
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ReviewHeader;
