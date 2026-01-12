"use client";

import {
  IconBackpack,
  IconShoe,
  IconJacket,
  IconBrandRedhat,
  IconTrekking,
  Icon3dCubeSphere,
} from "@tabler/icons-react";
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface TripDetails {
  duration: string;
  location: string;
  tripGrade: string;
  maximumAltitude: string;
  groupSize: string;
  activities: string;
  bestTime: string;
  starts: string;
}

interface WhatToBringItem {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface TripOverviewData {
  description: string;
  intro: string;
  details: TripDetails;
  highlights: string[];
  what_to_bring: WhatToBringItem[];
}

interface UpdatedTripOverviewProps {
  data: TripOverviewData;
  productName?: string;
}

const WHAT_TO_BRING_ICONS: { [key: string]: React.ElementType } = {
  IconBackpack,
  IconShoe,
  IconJacket,
  IconBrandRedhat,
  IconTrekking,
  Icon3dCubeSphere,
};

const WhatToBringItem = ({ item }: { item: WhatToBringItem }) => {
  return (
    <article className="flex gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#086032] hover:bg-green-50 transition-all items-start">
      <div className="flex-shrink-0">
        {React.createElement(WHAT_TO_BRING_ICONS[item.icon] || IconBackpack, {
          className: "w-6 h-6 text-[#086032]",
          "aria-hidden": "true",
        })}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <h4 className="font-semibold text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {item.description}
        </p>
      </div>
    </article>
  );
};

// Max height in pixels before showing read more (approx 7 lines)
const MAX_HEIGHT_PX = 168;

const Trip_Overview = ({ data, productName }: UpdatedTripOverviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);

  // Check if intro content overflows
  useEffect(() => {
    const checkOverflow = () => {
      if (introRef.current) {
        const scrollHeight = introRef.current.scrollHeight;
        setShowReadMore(scrollHeight > MAX_HEIGHT_PX);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [data?.intro]);

  if (!data) {
    return (
      <section
        id="trip-overview"
        aria-labelledby="trip-overview-heading"
        className="w-full flex flex-col gap-6"
      >
        <h2 id="trip-overview-heading" className="text-3xl font-bold">
          {productName ? `${productName} Overview` : "Trip Overview"}
        </h2>
        <div className="w-full p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-center">
            Trip overview data is not available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="trip-overview"
      aria-labelledby="trip-overview-heading"
      className="w-full flex flex-col gap-6"
    >
      <h2
        id="trip-overview-heading"
        className="text-2xl md:text-3xl font-bold"
      >
        {productName ? `${productName} Overview` : "Trip Overview"}
      </h2>

      {/* Intro Section with Read More - ONLY THIS SECTION HAS READ MORE */}
      {data.intro && (
        <article className="rounded-3xl bg-white p-6 flex flex-col w-full gap-4 shadow-sm">
          <div className="relative">
            <div
              ref={introRef}
              className="prose prose-sm md:prose-base prose-green max-w-none text-[#3E641C] leading-relaxed overflow-hidden transition-all duration-300 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
              style={{
                maxHeight: showReadMore ? `${MAX_HEIGHT_PX}px` : "none",
              }}
              dangerouslySetInnerHTML={{ __html: data.intro }}
            />

            {/* Gradient overlay when clamped */}
            {showReadMore && (
              <div
                className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Read More Button & Dialog - ONLY SHOWS INTRO DATA */}
          {showReadMore && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="self-start text-[#086032] hover:text-[#064d26] hover:bg-green-50 font-semibold flex items-center gap-1 px-0"
                >
                  Read More
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#3E641C]">
                    {productName ? `${productName} Overview` : "Trip Overview"}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Complete trip overview
                  </DialogDescription>
                </DialogHeader>

                {/* ONLY intro content in dialog */}
                <article className="mt-4">
                  <div
                    className="prose prose-sm md:prose-base prose-green max-w-none text-gray-700 leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                    dangerouslySetInnerHTML={{ __html: data.intro }}
                  />
                </article>
              </DialogContent>
            </Dialog>
          )}
        </article>
      )}

      {/* Trip Highlights - NO READ MORE */}
      <article className="flex flex-col gap-4 w-full bg-white p-6 rounded-3xl shadow-sm">
        <h3 className="font-bold text-xl text-[#3E641C]">Trip Highlights</h3>
        <div className="prose prose-sm md:prose-base max-w-none text-gray-700">
          <div
            className="[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      </article>

      {/* What to Bring Section */}
      <article className="flex flex-col gap-4 w-full bg-white p-6 rounded-3xl shadow-sm">
        <h3 className="font-bold text-xl text-[#3E641C]">What to Bring</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none">
          {data.what_to_bring && data.what_to_bring.length > 0 ? (
            data.what_to_bring.map((item) => (
              <li key={item.id}>
                <WhatToBringItem item={item} />
              </li>
            ))
          ) : (
            <li className="text-gray-600 text-center col-span-full">
              No items to bring information available.
            </li>
          )}
        </ul>
      </article>
    </section>
  );
};

export default Trip_Overview;
