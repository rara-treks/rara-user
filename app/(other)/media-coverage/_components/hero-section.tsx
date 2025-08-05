import React from "react";
import TextWithBrandmark from "@/components/text-with-brandmark";
import Image from "next/image";
import NewspaperImg from "@/assets/images/backgrounds/newspaper.webp";

function HeroSection() {
  return (
    <section className="relative">
      <Image src={NewspaperImg.src} width={1400} height={1400} alt="Press" className="w-full h-[300px] object-cover" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 text-center w-full max-w-[90vw]">
        <TextWithBrandmark size={100} type="h1" className="hidden md:flex text-center justify-center">
          Media Coverage
        </TextWithBrandmark>
        <TextWithBrandmark size={60} type="h1" className="flex md:hidden justify-center">
          Media Coverage
        </TextWithBrandmark>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </section>
  );
}

export default HeroSection;
