"use client";

import { useEffect, useState } from "react";
import HeroSection from "./_components/HeroSection";
import Team from "./_components/Team";
import WhyTravelWithUs from "./_components/WhyTravelWithUs";
import SafetyResponsibility from "./_components/SafetyResponsibility";
import FooterCTA from "./_components/FooterCTA";
import News from "@/components/home/News";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  WhoWeAreSkeleton,
  WhatWeDoSkeleton,
  MissionValuesSkeleton,
  TeamSkeleton,
  AdditionalSectionsSkeleton,
} from "./_components/AboutSkeleton";

interface PageData {
  type: string;
  title: string;
  slug: string;
  header: string;
  content1: string;
  content2: string;
  content3: string;
  featuredImage: string;
  meta: {
    metaTitle: string;
    keywords: string[];
    metaDescription: string;
  };
}

const About = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/product/page/detail/about");

        if (!response.ok) {
          throw new Error("Failed to fetch page data");
        }

        const result = await response.json();

        if (result.code === 0 && result.data) {
          setPageData(result.data);
          document.title = result.data.meta.metaTitle;
          const metaDescription = document.querySelector(
            'meta[name="description"]'
          );
          if (metaDescription) {
            metaDescription.setAttribute(
              "content",
              result.data.meta.metaDescription
            );
          }
        } else {
          throw new Error(result.message || "Failed to load page data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  useEffect(() => {
    if (!loading && pageData) {
      const hash = window.location.hash?.slice(1);

      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    }
  }, [loading, pageData]);

  if (error) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg">
            {error || "Failed to load page"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full bg-white">
        <HeroSection />
        <div className="w-full py-6 md:py-12 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <WhoWeAreSkeleton />
            <WhatWeDoSkeleton />
            <MissionValuesSkeleton />
            <TeamSkeleton />
          </div>
        </div>
        <AdditionalSectionsSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Featured Image */}
      <HeroSection featuredImage={pageData?.featuredImage} />

      {/* Our Story Section */}
      <div id="our-story" className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Who We Are Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="prose prose-lg max-w-none text-slate-700"
                  dangerouslySetInnerHTML={{ __html: pageData?.content1 || "" }}
                />
                {/* Soft CTA */}
                <Link
                  href="#why-travel"
                  className="inline-flex items-center gap-2 mt-6 text-emerald-600 hover:text-emerald-700 font-medium group"
                >
                  Why travel with us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              {pageData?.featuredImage && (
                <div className="hidden md:block">
                  <img
                    src={pageData.featuredImage}
                    alt="Rara Treks"
                    className="w-full h-auto rounded-xl shadow-xl object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Journey Section */}
          <div
            id="journey"
            className="mb-20 py-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 scroll-mt-20"
          >
            <div
              className="prose prose-lg max-w-none text-slate-700"
              dangerouslySetInnerHTML={{ __html: pageData?.content2 || "" }}
            />
          </div>

          {/* Mission & Values Section */}
          <div className="mb-20 scroll-mt-20">
            <div
              className="prose prose-lg max-w-none text-slate-700"
              dangerouslySetInnerHTML={{ __html: pageData?.content3 || "" }}
            />
          </div>
        </div>
      </div>

      {/* Why Travel With Us Section */}
      <WhyTravelWithUs />

      {/* Safety & Responsibility Section */}
      <SafetyResponsibility />

      {/* Team Section */}
      <div
        id="our-team"
        className="bg-slate-50 scroll-mt-20"
      >
        <Team />
      </div>

      {/* News Section */}
      <div className="py-16">
        <News />
      </div>

      {/* Footer CTA */}
      <FooterCTA
        title="Start Planning Your Trip"
        buttonText="Send an Inquiry"
        buttonLink="/contact"
      />
    </div>
  );
};

export default About;
