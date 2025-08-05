"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import EthnicPeopleImg from "@/assets/images/home/ethnic-people.webp";
import Link from "next/link";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

function ImpactVideoSection() {
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <section>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden border aspect-video" onClick={() => setShowVideo(true)}>
            {showVideo && (
              <iframe
                className="w-full h-full aspect-video"
                src="https://www.youtube.com/embed/Sz_Iv891ojY?si=_xW5HWlavyX7w_ct?rel=0"
                title="How Your Trip Impacts our Community"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
            <div className="cursor-pointer" hidden={showVideo}>
              <IconPlayerPlayFilled
                size={60}
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 border border-primary rounded-full text-primary p-2"
              />
              <Image
                className="absolute inset-0 z-10"
                src={EthnicPeopleImg}
                alt="How Your Trip Impacts our Community"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="font-bebas-neue text-3xl md:text-5xl">How Your Trip Impacts our Community</h3>
            <p>
              We help reroute tourism deprived regions by enabling families across Nepal to host paying guests into
              their homes
            </p>
            <Button className="rounded-full w-fit" asChild>
              <Link href="/impact">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpactVideoSection;
