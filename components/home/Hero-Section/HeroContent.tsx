import React from "react";
import { Hero } from "./types";
import GeneralInquiryPopup from "./GeneralInquiryPopup";
import BrowseTreks from "./BrowseTreks";
import LazyVideo from "@/components/ui/LazyVideo";

interface HeroContentProps {
  hero: Hero;
}

// Video URL
const VIDEO_SRC = "https://raratreks.oss-ap-southeast-1.aliyuncs.com/public/raratreks.mp4?OSSAccessKeyId=LTAI5tBLcHS1BZEEJDorpqSF&Expires=1795423865&Signature=0NEBZf%2BpaukBnqTAy1izgxf2q%2B0%3D";

export const HeroContent = ({ hero }: HeroContentProps) => {
  return (
    <div className="self-stretch w-full h-[90vh] overflow-hidden shrink-0 relative bg-gray-900">
      <LazyVideo
        src={VIDEO_SRC}
        className="absolute inset-0 w-full h-full object-cover object-top"
        autoPlay
        loop
        muted
        playsInline
        priority={true}
      />

      <div className="relative inset-0 h-full flex flex-col items-center justify-center px-2 md:px-5 gap-8 z-10">
        <h1 className="w-full text-[28px] md:text-3xl lg:text-[64px] text-center leading-[150%] font-extrabold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          {hero.title}
        </h1>

        <div className="flex items-start md:items-center justify-center gap-4 sm:gap-6">
          <div className="relative group flex items-center justify-center ">
            <GeneralInquiryPopup buttonText="Plan Your Trip" />
          </div>

          <div className="relative group flex items-center justify-center">
            <BrowseTreks />
          </div>
        </div>
      </div>
    </div>
  );
};

