import React, { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "./types";
import Link from "next/link";
import Image from "next/image";

interface HeroContentProps {
  hero: Hero;
}

export const HeroContent = ({ hero }: HeroContentProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (  
    <div className="self-stretch rounded-[20px] h-[541px] overflow-hidden shrink-0 relative">
      <Image
        src={hero.backgroundImage}
        alt={hero.title}
        fill
        priority
        quality={85}
        sizes="100vw"
        className={`object-cover object-top transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}

      {/* Content overlay */}
      <div className="relative h-full flex flex-col items-center justify-start pt-[90px] px-2 md:px-5 pb-[68px] gap-4 z-10">
        <h1 className="w-full text-[28px] md:text-3xl lg:text-[64px] text-center mb-2 lg:mb-6 leading-[150%] font-extrabold text-white drop-shadow-lg">
          {hero.title}
        </h1>

        <Link href="#trips" aria-label="View available trips">
          <Button className="rounded-[22px] bg-[#71B344] flex flex-row items-center justify-center py-2 px-4 gap-2 text-base text-whitesmoke font-inter hover:bg-[#5fa035] transition-colors duration-200 cursor-pointer shadow-lg">
            <span className="leading-[150%]">{hero.buttonText}</span>
            <ChevronRightIcon
              className="text-white"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};
