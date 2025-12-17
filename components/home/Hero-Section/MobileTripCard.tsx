import React from "react";
import Image from "next/image";
import { Trip } from "./types";

interface MobileTripCardProps {
  trip: Trip;
}

export const MobileTripCard = ({
  trip,
}: MobileTripCardProps) => {
  return (
    <div className="w-full flex-shrink-0 flex flex-col items-center justify-center p-2 gap-2">
      <div className="relative w-[180px] h-[280px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover"
          sizes="280px"
        />
        <div className="absolute bottom-0 py-2 bg-[#086032] left-0 right-0 flex flex-row items-center justify-center bg-opacity-90">
          <div className="relative leading-[150%] text-white text-sm">
            <span>{`Starting at `}</span>
            <b>
              {trip.currency} {trip.price}
            </b>
            <span> only</span>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col items-center justify-start text-lg text-darkslategray px-4">
        <b className="text-center leading-[150%] hover:text-olivedrab transition-colors cursor-pointer">
          {trip.title}
        </b>
      </div> */}
    </div>
  );
};
