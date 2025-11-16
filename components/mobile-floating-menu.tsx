"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, MessageSquare, Plus, Phone, BookOpen } from "lucide-react";
import CustomTripInquiryPopup from "@/components/ProductDetail/Details/Departure/CustomInquiry";
import { Button } from "./ui/button";

interface PricingTier {
  discounted_price_usd: number;
  number_of_people: number;
  original_price_usd: number;
}

interface InquiryData {
  id: number;
  title: string;
  prices: PricingTier[];
  impact?: any;
  what_to_bring?: any;
  blogUrl?: string;
}

interface StickyBottomActionsProps {
  data: InquiryData;
  onCheckAvailability?: () => void;
  disabled?: boolean;
}

function StickyBottomActions({
  data,
  onCheckAvailability,
  disabled = false,
}: StickyBottomActionsProps) {
  const handleBlogClick = () => {
    if (data.blogUrl) {
      window.location.href = data.blogUrl;
    } else {
      window.location.href = "/blog";
    }
  };

  return (
    <>
      <aside className="fixed bottom-0 left-0 right-0 bg-white z-50 sm:hidden shadow-[0_-5px_10px_0px_#00000024] max-h-20">
        <div
          className={cn(
            "grid grid-cols-5 px-2 py-3 items-center justify-items-center max-w-96 mx-auto",
            "[&_button]:flex [&_button]:flex-col [&_button]:items-center [&_button]:justify-center [&_button]:w-full [&_button]:gap-1",
            "[&_span]:text-xs [&_span]:text-center [&_span]:font-medium"
          )}
        >
          {/* Left Button 1 - Check Dates */}
          <CustomTripInquiryPopup
            buttonText=""
            trekTitle={data.title}
            trekId={data.id}
            defaultDestination={data.title}
            isMobile
            icon={<MessageSquare className="w-5 h-5 text-purple-600" />}
            label="Inquire Trip"
          />

          {/* Left Button 2 - Send Inquiry */}
          <div className="w-full h-full flex items-center justify-center">
            <CustomTripInquiryPopup
              buttonText=""
              trekTitle={data.title}
              trekId={data.id}
              defaultDestination={data.title}
              isMobile
              icon={<Calendar className="w-5 h-5 text-green-600" />}
              label="Book Now"
            />
          </div>

          {/* Center Button - Blog */}
          <Button
            onClick={handleBlogClick}
            className="flex items-center justify-center rounded-full -mt-10 w-14 h-14 bg-blue-900 hover:bg-blue-950 transition-all shadow-lg"
          >
            <BookOpen className="w-7 h-7 text-white" />
          </Button>

          {/* Right Button 1 - Custom Trip */}
          <div className="w-full h-full flex items-center justify-center">
            <CustomTripInquiryPopup
              buttonText=""
              trekTitle={data.title}
              trekId={data.id}
              defaultDestination={data.title}
              isMobile
              icon={<Plus className="w-5 h-5 text-purple-600" />}
              label="Custom Trip"
            />
          </div>

          {/* Right Button 2 - Contact */}
          <button
            onClick={() => (window.location.href = "/contact")}
            className="hover:opacity-80 transition-all"
          >
            <Phone className="w-5 h-5 text-red-600" />
            <span>Contact</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default StickyBottomActions;
