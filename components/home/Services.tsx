"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Jungle Safari",
    image: "/assets/1.png",
    route: "/services/jungle-safari",
    width: "wide", // 434px equivalent
  },
  {
    title: "Paragliding",
    image: "/assets/2.png",
    route: "/services/paragliding",
    width: "wide", // 434px equivalent
  },
  {
    title: "Base Camp Trekking",
    image: "/assets/3.png",
    route: "/services/base-camp-trekking",
    width: "narrow", // 332px equivalent
  },
  {
    title: "Green Grassland",
    image: "/assets/1.png",
    route: "/services/green-grassland",
    width: "narrow", // 332px equivalent - positioned differently in row 2
  },
  {
    title: "Upper Mustang Trek",
    image: "/assets/2.png",
    route: "/services/upper-mustang-trek",
    width: "wide", // 434px equivalent
  },
  {
    title: "Beautiful Terai Explore",
    image: "/assets/3.png",
    route: "/services/terai-explore",
    width: "wide", // 434px equivalent
  },
  {
    title: "East Adventure",
    image: "/assets/1.png",
    route: "/services/east-adventure",
    width: "wide", // 434px equivalent
  },
  {
    title: "Hill Trekking",
    image: "/assets/2.png",
    route: "/services/hill-trekking",
    width: "wide", // 434px equivalent
  },
  {
    title: "Mountain Climbing",
    image: "/assets/3.png",
    route: "/services/mountain-climbing",
    width: "narrow", // 332px equivalent
  },
];

const Services = () => {
  // Arrange services in the specific layout pattern
  const rows = [
    [services[0], services[1], services[2]], // Jungle Safari, Paragliding, Base Camp Trekking
    [services[3], services[4], services[5]], // Green Grassland, Upper Mustang Trek, Beautiful Terai Explore
    [services[6], services[7], services[8]], // East Adventure, Hill Trekking, Mountain Climbing
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full container mx-auto py-16">
      <div className="flex flex-col w-full items-center justify-center gap-1">
        <p className="text-xl lg:text-2xl font-satisfy text-gray-600">
          We offer diverse services
        </p>
        <h1 className="text-3xl lg:text-4xl flex items-center gap-2 font-bold text-gray-900">
          Explore <span className="text-[#71B344]">Services</span>
        </h1>
      </div>

      <div className="flex flex-col gap-5 w-full max-w-[1200px]">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-5 h-[213px]">
            {row.map((service, serviceIndex) => (
              <Link
                key={serviceIndex}
                href={service.route}
                className={`relative rounded-[32px] overflow-hidden group cursor-pointer ${
                  service.width === "wide"
                    ? "w-[434px] flex-shrink-0"
                    : "w-[332px] flex-shrink-0"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition duration-300"
                  sizes="(max-width: 434px) 100vw, 434px"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition duration-300">
                  <h3 className="text-white text-2xl font-semibold text-center px-4 leading-[150%]">
                    {service.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Responsive grid for smaller screens */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {services.map((service, idx) => (
          <Link
            key={idx}
            href={service.route}
            className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transform group-hover:scale-105 transition duration-300"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition duration-300">
              <h3 className="text-white text-lg font-semibold text-center px-4">
                {service.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
