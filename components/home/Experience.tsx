"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const experienceData = {
  backgroundImage: {
    src: "/assets/experience.png",
    alt: "Experience Image",
    width: 1000,
    height: 500,
  },
  title: {
    main: "Experience the",
    highlight: "Himalayas",
    suffix: "Your Way",
  },
  galleryImages: [
    {
      id: 1,
      src: "/assets/1.png",
      alt: "Experience 1",
    },
  ],
  content: {
    subtitle: "Tailored Treks & Private Adventures Across the Himalayas",
    paragraphs: [
      "Rara Treks is a proudly Nepali-run travel company specializing in eco-conscious trekking experiences to the stunning Rara National Park and the iconic Rara Lake. As the largest lake in Nepal (nearly 167km), surrounded by pine-spruce forests, alpine rhododendrons, and towering Himalayan peaks, it offers a perfect blend of solitude, scenic beauty, and cultural immersion.",
      "Our team is deeply rooted in the local communities and driven by sustainable tourism principles. We ensure every trek not only preserves nature but also supports and uplifts the communities we visit.",
      "Choose from flexible 8-15 day itineraries (including flights via Nepalgunj-Jumla) with all-inclusive services—teahouses, tent camps, meals, permits, experienced English-speaking guides, and safety-first support systems.",
      "Ready to tread where few have been and capture the essence of one of Nepal's most tranquil wilderness destinations?",
    ],
    callToAction: {
      text: "Plan your trip",
    },
  },
};

const Experience = ({ data = experienceData }) => {
  const { backgroundImage, title, galleryImages, content } = data;
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full py-12 md:py-16 lg:py-20 flex flex-col items-center justify-center bg-gradient-to-b from-[#1E2F22] to-[#162319] md:bg-image lg:bg-image-lg bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="w-full  mx-auto max-w-7xl px-4">
      
        <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8">
          {/* Dynamic Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl flex flex-wrap items-center justify-center gap-2 text-center font-bold text-white mb-4 md:mb-6 lg:mb-8">
            {title.main}{" "}
            <span className="text-[#f2a135]">{title.highlight}</span>{" "}
            {title.suffix}
          </h2>

          {/* Responsive Layout Container */}
          <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-6 md:gap-8 lg:gap-12">
            {/* Images Section - Dynamic Gallery */}
            <div className="grid grid-cols-1 gap-4 flex-1 max-w-md w-full lg:max-w-xs xl:max-w-md">
              {/* First image - height based on content */}
              <div
                className="w-full"
                style={{ height: contentHeight || "auto" }}
              >
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  width={500}
                  height={500}
                  quality={85}
                  loading={"lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Content Section - Dynamic Content */}
            <div
              ref={contentRef}
              className="flex-1 text-white space-y-3 md:space-y-4 lg:space-y-6 w-full"
            >
              <h3 className="text-lg md:text-xl lg:text-xl font-semibold text-[#71B344]">
                {content.subtitle}
              </h3>

              {/* Dynamic Paragraphs */}
              {content.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-xs md:text-sm lg:text-sm leading-relaxed ${
                    index === content.paragraphs.length - 1 ? "italic" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}

              <Link href="/contact" className="mt-4 items-center gap-4 flex">
                <Button className="flex items-center gap-3 px-6 font-bold text-white bg-[#f2a135] hover:bg-[#f2a135] hover:text-white transition-all duration-300">
                  {content.callToAction.text}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
export { experienceData };
