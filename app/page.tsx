import React from "react";
import dynamicImport from "next/dynamic";
import { Metadata } from "next";
import HeroSection from "@/components/home/hero-section";
import Why from "@/components/home/Why";
import MainTourComponent from "@/components/home/TravelContent";

export const metadata: Metadata = {
  title: "Rara Treks Tours & Travels | Nepal Trekking & Tour Operator",
  description:
    "Explore Nepal with Rara Treks Tours & Travels, offering luxury, family, solo, and budget trekking and tours across Everest, Annapurna, Rara, and other Himalayan destinations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rara Treks Tours & Travels | Nepal Trekking & Tour Operator",
    description:
      "Explore Nepal with Rara Treks Tours & Travels, offering luxury, family, solo, and budget trekking and tours across Everest, Annapurna, Rara, and other Himalayan destinations.",
    url: "/",
    type: "website",
  },
};


// Dynamic imports for below-fold components - defers JS loading until needed
const Experience = dynamicImport(() => import("@/components/home/Experience"), {
  loading: () => <div className="w-full h-96 bg-gray-900 animate-pulse" />,
});

const Adventure = dynamicImport(() => import("@/components/home/Adventure"), {
  loading: () => <div className="w-full h-96 bg-gray-100 animate-pulse" />,
});

const Testimonial = dynamicImport(
  () => import("@/components/home/Testimonial/Testimonial"),
  {
    loading: () => <div className="w-full h-96 bg-gray-100 animate-pulse" />,
  }
);

const News = dynamicImport(() => import("@/components/home/News"), {
  loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse" />,
});

const HomePopup = dynamicImport(() => import("@/components/home-popup"), {
  loading: () => null, // Popup doesn't need loading state
});

const Newsletter = dynamicImport(() => import("@/components/footer/Newsletter"), {
  loading: () => <div className="w-full h-32 bg-gray-100 animate-pulse" />,
});

async function Home() {
  return (
    <main className="flex flex-col gap-10">
      <div>
        <div className="w-full">
          <HeroSection />
        </div>
        <Why />
      </div>
      <div className="container" id="trips">
        <MainTourComponent />
      </div>
      {/* <Journey /> */}

      <Experience />

      <Adventure />
      <div className="flex flex-col h-full gap-10">
        <div id="reviews" className="h-full">
          <Testimonial />
        </div>
        <News />
      </div>

      <HomePopup />
      <div id="newsletter">
        <Newsletter />
      </div>
    </main>
  );
}

export default Home;
export const dynamic = "force-static";
