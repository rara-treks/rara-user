import Image from "next/image";
import React from "react";

const Journey = () => {
  const journeyItems = [
    {
      icon: "/assets/icons/journey.svg",
      title: "Culture Journey",
      alt: "Culture Journey Icon",
    },
    {
      icon: "/assets/icons/trekking.svg",
      title: "Trekking Trials",
      alt: "Trekking Icon",
    },
    {
      icon: "/assets/icons/mountain.svg",
      title: "Mountain Expeditions",
      alt: "Mountain Icon",
    },
    {
      icon: "/assets/icons/wildlife.svg",
      title: "Wildlife & Nature",
      alt: "Wildlife Icon",
    },
    {
      icon: "/assets/icons/adventure.svg",
      title: "Adventure Journey",
      alt: "Adventure Icon",
    },
    {
      icon: "/assets/icons/scenic.svg",
      title: "Scenic Flights",
      alt: "Scenic Flights Icon",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full relative min-h-[350px] md:min-h-[300px]">
        <Image
          src="/assets/mountain.png"
          alt="Mountain Journey Background"
          width={1000}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 z-10">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between w-full max-w-7xl px-8 xl:px-16">
            {journeyItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-3 group transform transition-all duration-300 hover:scale-110"
              >
                <div className="flex rounded-full p-3 bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={50}
                    height={50}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-white font-bold text-lg xl:text-xl text-center drop-shadow-lg group-hover:text-yellow-200 transition-colors duration-300">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:grid lg:hidden grid-cols-3 gap-6 w-full max-w-4xl px-8">
            {journeyItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col mb-4 items-center justify-center gap-2 group transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex rounded-full p-2 bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <p className="text-white font-bold text-sm text-center drop-shadow-lg group-hover:text-yellow-200 transition-colors duration-300">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="grid md:hidden grid-cols-2 gap-4 w-full max-w-sm px-6">
            {journeyItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center mb-4 justify-center gap-1 group transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="flex rounded-full p-2 bg-white shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <p className="text-white font-semibold text-xs text-center drop-shadow-md leading-tight group-hover:text-yellow-200 transition-colors duration-300">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
