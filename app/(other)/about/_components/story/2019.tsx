import Link from "next/link";
import React from "react";
import IIPTAward2019Img from "@/assets/images/awards/iipt-awards-2019.webp";
import Image from "next/image";

function Story2019() {
  return (
    <div className="relative group">
      <h2>2019</h2>
      <div className="w-full h-1 bg-muted block absolute top-10 group-hover:bg-primary transition-colors duration-500"></div>
      <p>
        Established several partnerships with amazing companies. We created a Home stay Management training & redesigned
        our website for a better service experience. Our network of Communities across Nepal reached 22
      </p>
      <Link href="/assets/reports/2019.pdf" target="_blank">
        <b>2019 Annual Report</b>
      </Link>
      <div className="grid grid-cols-3 gap-4 md:gap-8 mt-3">
        <Image src={IIPTAward2019Img} alt="IIPT Award 2019" />
      </div>
    </div>
  );
}

export default Story2019;
