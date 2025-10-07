import React from "react";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "./types";
import Link from "next/link";

interface HeroContentProps {
  hero: Hero;
}

export const HeroContent = ({
  hero,
}: HeroContentProps) => {
  return (
    <div
      className="self-stretch rounded-[20px] h-[541px] overflow-hidden shrink-0 flex flex-col items-center justify-start pt-[90px] px-2 md:px-5 pb-[68px] box-border relative gap-4 bg-cover bg-no-repeat bg-[top]"
      style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
    >
      <div className="w-full text-[28px] md:text-3xl lg:text-[64px] text-center mb-2 lg:mb-6 relative leading-[150%] font-extrabold inline-block z-[0]">
        {hero.title}
      </div>
      <Link href="#trips">
        <Button className="rounded-[22px] bg-[#71B344] flex flex-row items-center justify-start py-2 px-4 gap-2 z-[1] text-base text-whitesmoke font-inter hover:bg-opacity-90 transition-all cursor-pointer">
          <div className="relative leading-[150%]">{hero.buttonText}</div>
          <ChevronRightIcon className="text-white" size={16} />
        </Button>
      </Link>
    </div>
  );
};
