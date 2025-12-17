"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

interface CardData {
  icon: string;
  title: string;
  description: string;
}

const Card = ({ icon, title, description }: CardData) => (
  <div className="bg-black/30 backdrop-blur-sm rounded-[32px] p-6 h-full flex flex-col items-center text-center">
    <div className="w-16 h-16 mb-4 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full">
        <Image src={icon} alt={title} width={12} height={12} className="w-full h-full text-white" />
      </div>
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

const Why = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const cardData: CardData[] = [
    {
      icon: "/assets/why/one.svg",
      title: "Tailored Treks",
      description: "Customized itineraries for your pace and budget.",
    },
    {
      icon: "/assets/why/two.svg",
      title: "Local Guides",
      description: "Experts from the communities you explore.",
    },
    {
      icon: "/assets/why/three.svg",
      title: "Fair Pricing",
      description: "Transparent rates with no hidden costs.",
    },
    {
      icon: "/assets/why/four.svg",
      title: "Safety First",
      description: "Your comfort and safety, always.",
    },
    {
      icon: "/assets/why/five.svg",
      title: "Sustainability",
      description: "Preserving nature, supporting locals, respecting culture.",
    },
    {
      icon: "/assets/why/six.svg",
      title: "Trusted by Many",
      description: "Guests return and bring friends.",
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full flex items-center justify-center py-8 bg-gradient-to-b from-[#1E2F22] to-[#162319]">
      <div className="w-full flex flex-col items-center justify-center md:container px-4 md:px-0 py-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
          Why choose <span className="text-[#f2a135]">Rara Treks</span>
        </h2>

        <div className="w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {cardData.map((card: CardData, index: number) => (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/5 pl-2 md:pl-4"
                >
                  <Card
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden xl:flex" />
            <CarouselNext className="hidden xl:flex" />
          </Carousel>
        </div>

        {/* Mobile Indicators */}
        <div className="flex gap-2 mt-6 md:hidden">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${index === current ? "w-8 bg-[#086032]" : "w-2 bg-white/30"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Why;
