"use client";

import { Button } from "@/components/ui/button";
import { CustomTripSectionProps } from "./types";
import CustomTripInquiryPopup from "./CustomInquiry";

const CustomTripSection = ({
  onCreateCustomTrip,
  trekTitle,
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
        {/* <Button
          onClick={onCreateCustomTrip}
          className="bg-[#71B344] hover:bg-[#5A8F37] text-white rounded-full px-6 py-2 transition-colors duration-200"
        >
          Create Custom Trip
        </Button> */}
        <CustomTripInquiryPopup trekTitle={trekTitle} />
      </div>
    </div>
  );
};

export default CustomTripSection;
