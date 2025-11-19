import React from "react";
import Image from "next/image";
import TripadvisorLogo from "@/assets/images/logos/tripadvisor.webp";
import Link from "next/link";

interface Props {
  className?: string;
}

function TripadvisorRating({ className }: Props) {
  return (
    <Link
      href="https://www.tripadvisor.com/Attraction_Review-g293890-d24948428-Reviews-Rara_Treks_Tours_Travels-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Region.html"
      rel="noreferrer"
      target="_blank"
      className={className}
    >
      <div className="grid grid-cols-[auto_auto] rounded-3xl gap-2 w-fit items-center">
        <div>
          <Image
            src={TripadvisorLogo}
            alt="Tripadvisor logo"
            className="size-12"
          />
        </div>
        {/* <div>
          <h4 className="font-semibold text-sm">Tripadvisor</h4>
          <div className="flex gap-1 *:block *:w-3 *:h-3 mt-0.5 *:rounded-full *:bg-green-400 *:aspect-square">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h6 className="text-sm">0 reviews</h6>
        </div> */}
        {/* <div>
          <h6 className="font-bebas-neue text-3xl">4.9</h6>
        </div> */}
      </div>
    </Link>
  );
}

export default TripadvisorRating;
