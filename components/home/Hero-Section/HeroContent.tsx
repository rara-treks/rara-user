import React from "react";
import { Hero } from "./types";
import GeneralInquiryPopup from "./GeneralInquiryPopup";
import BrowseTreks from "./BrowseTreks";

interface HeroContentProps {
  hero: Hero;
}

export const HeroContent = ({ hero }: HeroContentProps) => {
  return (
    <div className="self-stretch h-[541px] overflow-hidden shrink-0 relative bg-gray-900">
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/assets/video/video.mp4"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      <div className="relative h-full flex flex-col items-center justify-center px-2 md:px-5 gap-8 z-10">
        <h1 className="w-full text-[28px] md:text-3xl lg:text-[64px] text-center leading-[150%] font-extrabold text-white drop-shadow-lg">
          {hero.title}
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <GeneralInquiryPopup buttonText="Plan Your Trip" />
          <BrowseTreks />
        </div>
      </div>
    </div>
  );
};
