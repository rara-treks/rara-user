"use client";

import { CustomTripSectionProps } from "./types";
import CustomTripInquiryPopup from "./CustomInquiry";

const CustomTripSection = ({
  trekTitle,
  trekId,
}: CustomTripSectionProps) => {
  return (
    <div className="w-full flex flex-col gap-3 p-6 bg-white rounded-2xl">
      <p className="text-[#3E641C]">
        You can also create your personal trekking journey. It might be slightly
        expensive than default one but it will give you full control over the
        trips plan its structure and you can event set differnet checkpoints
        according to your need and preferences.
      </p>
      <div>
        <CustomTripInquiryPopup
          buttonText="Create Custom Trip"
          trekTitle={trekTitle}
          trekId={trekId}
        />
      </div>
    </div>
  );
};

export default CustomTripSection;
