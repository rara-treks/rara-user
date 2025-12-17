import React from "react";
import Image from "next/image";
import { Trip } from "./types";
import Link from "next/link";

interface TripCardProps {
  trip: Trip;
  className?: string;
}

export const TripCard = ({ trip, className = "" }: TripCardProps) => {
  return (
    <div  >
      <Link href={trip.slug}>
        <div
          className={`flex flex-col items-center justify-center p-0 gap-2 overflow-hidden ${className}`}
        >
          <div className="relative w-[231px] h-[332px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat cursor-pointer">
            <Image
              src={trip.image}
              alt={trip.title}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300 ease-out"
              sizes="(max-width: 768px) 100vw, 231px"
            />
            <div className="absolute bottom-0 py-1 bg-[#086032] left-0 right-0 flex flex-row items-center justify-center py-[1px] px-0 bg-opacity-90">
              <div className="w-[231px] relative leading-[150%] text-white inline-block shrink-0 text-sm">
                <span>{`Starting at `}</span>
                <b>
                  {trip.currency} {trip.price}
                </b>
                <span> only</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-lg text-darkslategray">
            <b className="w-[231px] relative leading-[150%] inline-block hover:text-olivedrab transition-colors cursor-pointer">
              {trip.title}
            </b>
          </div>
        </div>
      </Link>
    </div>
  );
};
