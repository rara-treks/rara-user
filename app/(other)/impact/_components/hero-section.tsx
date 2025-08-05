import Image from "next/image";
import React from "react";
import TextWithBrandmark from "@/components/text-with-brandmark";

interface Props {
  title: string;
  description: string;
  image: string | null;
}

function HeroSection({ title, description, image }: Props) {
  return (
    <section className="relative">
      {image && (
        <Image
          src={image}
          width={1400}
          height={1400}
          alt="Greeting the Guest"
          className="w-full h-[400px] object-cover"
        />
      )}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 text-center w-full max-w-[90vw]">
        <TextWithBrandmark size={100} type="h1" className="hidden md:flex text-center justify-center">
          {title}
        </TextWithBrandmark>
        <TextWithBrandmark size={60} type="h1" className="flex md:hidden justify-center">
          {title}
        </TextWithBrandmark>
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </section>
  );
}

export default HeroSection;
