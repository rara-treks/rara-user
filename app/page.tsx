import React from "react";
import HeroSection from "@/components/home/hero-section";

async function Home() {

  return (
    <main className="flex flex-col gap-10 pb-10">
      <div className="w-full px-10">
        <HeroSection />
      </div>
    </main>
  );
}

export default Home;
export const dynamic = "force-static";
