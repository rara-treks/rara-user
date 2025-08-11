import React from "react";
import HeroSection from "@/components/home/hero-section";
import Journey from "@/components/home/Journey";
import TrekCarousel from "@/components/home/TrekCarousel";
import TourCarousel from "@/components/home/TourCarousel";
import ActivityCarousel from "@/components/home/ActivityCarousel";

async function Home() {
  return (
    <main className="flex flex-col gap-10 pb-10">
      <div className="w-full px-3 md:px-10">
        <HeroSection />
      </div>
      <Journey />
      <TrekCarousel />
      <TourCarousel />
      <ActivityCarousel />
    </main>
  );
}

export default Home;
export const dynamic = "force-static";
