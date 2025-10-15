"use client";
import React from "react";
import { heroData } from "./Hero-Section/data";
import { HeroContent } from "./Hero-Section/HeroContent";
import { RatingComponent } from "./Hero-Section/RatingComponent";
import { TripsCarousel } from "./Hero-Section/TripsCarousel";
import { SocialIcons } from "./Hero-Section/SocialIcons"; 

const HeroSection = () => {
  const data = heroData; 

  return (
    <section className="relative w-full rounded-[20px] lg:h-auto justify-center overflow-hidden *:select-none">
      <div className="w-full relative flex flex-col items-center justify-start py-0 box-border text-left text-[64px] lg:h-auto font-sen">
        <div className="relative w-full px-3 md:px-10">
          {/* Hero Content */}
          <HeroContent hero={data.hero} />

          <div className=" w-full px-3 md:px-20">
            {/* Social Media Icons */}
            <SocialIcons />

            {/* Google Rating */}
            <RatingComponent rating={data.rating} />
          </div>
        </div>

          {/* Trip Cards & Carousel */}
          <TripsCarousel trips={data.trips} />
      </div>
    </section>
  );
};

export default HeroSection;
