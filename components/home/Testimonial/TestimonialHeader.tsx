"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface TestimonialHeaderProps {
  onReadAllClick?: () => void;
}

export default function TestimonialHeader({
  onReadAllClick,
}: TestimonialHeaderProps) {
  return (
    <div className="flex w-full items-end justify-between mb-8">
      <div className="flex flex-col gap-1">
        <p className="text-xl lg:text-2xl font-satisfy">
          Stories of unforgettable adventutres
        </p>
        <h1 className="text-3xl lg:text-4xl flex items-center gap-1 font-bold text-gray-900">
          Happy <span className="text-[#71B344]">Explorers</span>
        </h1>
      </div>
      {/* <div className="hidden lg:flex items-center justify-center">
        <Button
          onClick={onReadAllClick}
          className="flex items-center gap-1 bg-[#71B344] hover:bg-[#5a8c35] text-white px-6 py-2 rounded-full"
        >
          Read all Reviews <ArrowRight className="w-4 h-4" />
        </Button>
      </div> */}
    </div>
  );
}
