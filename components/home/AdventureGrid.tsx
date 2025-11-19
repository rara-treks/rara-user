"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdventureCard from "./AdventureCard";
import { Adventure } from "./Adventure";
import Link from "next/link";

interface AdventureGridProps {
  title?: string;
  data: Adventure[];
}

const AdventureGrid = ({ title = "", data }: AdventureGridProps) => {
  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Header with title and navigation buttons */}
      <div className="flex w-full items-end justify-between mb-8">
        <div className="flex flex-col gap-1">
          <p className="text-xl lg:text-2xl font-satisfy">
            Popular destination
          </p>
          <h1 className="text-3xl lg:text-4xl flex items-center gap-1 font-bold text-gray-900">
            Upcoming <p className="text-[#71B344]">{title}</p>
          </h1>
        </div>
        {/* Custom navigation buttons */}
        <div className="hidden lg:flex items-center justify-center">
          <Link href="/trek">
            <Button className="flex items-center gap-1">
              View All Adventures <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {data.map((adventure) => (
          <AdventureCard key={adventure.id} data={adventure} />
        ))}
      </div>
    </div>
  );
};

export default AdventureGrid;
