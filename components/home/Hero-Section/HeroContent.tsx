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
        src="https://raratreks.oss-ap-southeast-1.aliyuncs.com/public/raratreks.mp4?OSSAccessKeyId=LTAI5tBLcHS1BZEEJDorpqSF&Expires=1795423865&Signature=0NEBZf%2BpaukBnqTAy1izgxf2q%2B0%3D"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      <div className="relative h-full flex flex-col items-center justify-center px-2 md:px-5 gap-8 z-10">
        <h1 className="w-full text-[28px] md:text-3xl lg:text-[64px] text-center leading-[150%] font-extrabold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          {hero.title}
        </h1>
        <p className="text-sm md:text-2xl font-bold text-center bg-white bg-clip-text text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          From Everest Base Camp to hidden trails - guided treks, local support,
          <br className="hidden md:block" />
          and careful acclimatization for confident travelers.
        </p>

        <div className="flex absolute bottom-4 md:left-16 items-start md:items-center justify-center gap-4 sm:gap-6">
          <div className="relative group flex items-center justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#71B344] via-[#8fd05f] to-[#71B344] rounded-full blur-md opacity-60 group-hover:opacity-90 animate-pulse-slow transition-opacity duration-300"></div>

            <div className="relative border-2 border-[#71B344] py-1 px-2 h-14 flex items-center justify-center rounded-full bg-white shadow-[0_4px_20px_0_rgba(113,179,68,0.3)] hover:shadow-[0_6px_30px_0_rgba(113,179,68,0.5)] hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#71B344] to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>

              <div className="relative z-10 flex items-center justify-center">
                <GeneralInquiryPopup buttonText="Plan Your Trip" />
              </div>
            </div>
          </div>

          <div className="relative group flex items-center justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#71B344] via-[#8fd05f] to-[#71B344] rounded-full blur-md opacity-60 group-hover:opacity-90 animate-pulse-slow transition-opacity duration-300"></div>

            <div className="relative border-2 border-[#71B344] py-1 px-2 h-14 flex items-center justify-center rounded-full bg-white shadow-[0_4px_20px_0_rgba(113,179,68,0.3)] hover:shadow-[0_6px_30px_0_rgba(113,179,68,0.5)] hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#71B344] to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>

              <div className="relative z-10 flex items-center justify-center">
                <BrowseTreks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
