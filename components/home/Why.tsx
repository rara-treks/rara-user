import React from "react";
import Card from "./Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CardData {
  icon: string;
  title: string;
  description: string;
}

const Why = () => {
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

  return (
    <div className="w-full flex items-center justify-center py-8 bg-gradient-to-b from-[#1E2F22] to-[#162319]">
      <div className="w-full flex flex-col items-center justify-center md:container px-4 md:px-0 py-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
          Why choose <span className="text-[#71B344]">Rara Trek</span>
        </h2>

        <div className="w-full">
          <Carousel
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
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Why;