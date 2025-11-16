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
      title: "Tailored Treks, Your Way",
      description:
        "We create customized itineraries that fit your pace, interests, and budget always.",
    },
    {
      icon: "/assets/why/two.svg",
      title: "Led by Locals Who Live the Mountains",
      description:
        "Our guides are from the very communities you explore, offering unmatched insight and care.",
    },
    {
      icon: "/assets/why/three.svg",
      title: "Fair Pricing, Honest Experience",
      description:
        "Transparent rates with no hidden costs. What you see is what you get.",
    },
    {
      icon: "/assets/why/four.svg",
      title: "Safety Comes First",
      description:
        "We're deeply committed to your comfort and safety in every step of the journey.",
    },
    {
      icon: "/assets/why/five.svg",
      title: "Rooted in Sustainability",
      description:
        "We tread lightly preserving nature, supporting locals, and respecting culture.",
    },
    {
      icon: "/assets/why/six.svg",
      title: "Loved by Adventurers Worldwide",
      description:
        "Many of our guests return and bring friends. That says a lot.",
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
                  className="basis-full md:basis-1/3 pl-2 md:pl-4"
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