import { cn } from "@/lib/utils";
import Image from "next/image";
import HeritageImg from "@/assets/images/home/heritage.webp";
import Link from "next/link";
import React from "react";
import { Copyright } from "lucide-react";

function FooterBottomMenuAndImage() {
  return (
    <>
      <div
        className={cn(
          "sm:absolute sm:-translate-x-1/2 sm:bottom-4 sm:left-1/2 sm:z-20 sm:text-white",
          "font-medium text-sm md:text-base text-center mt-5 sm:mt-0 sm:px-5",
          "flex flex-wrap gap-x-4 gap-y-1 md:gap-y-0 md:gap-x-8 justify-center items-center w-full"
        )}
      >
        <div className="flex flex-wrap gap-2 justify-center *:underline mb-1">
          <Link href="/terms-and-conditions">Terms</Link> |<Link href="/privacy-policy">Privacy</Link> |
          <Link href="/inquiry-and-cancellation-policy">Inquiry & Cancellation</Link>
        </div>
        <p className="flex gap-1 items-center">
          <Copyright size={16} /> 2024 Community Homestay Network, Inc.
        </p>
        <div className="flex flex-wrap gap-x-4 md:gap-x-8 justify-center items-center">
          <p>
            Crafted by{" "}
            <Link className="underline" href="http://quarkinfotech.com/" rel="noreferrer" target="_blank">
              QuarkInfoTech
            </Link>
          </p>
        </div>
      </div>
      <Image
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[110vw] max-w-none md:max-w-[1750px] object-cover object-top md:-mb-[8vw] lg:-mb-[200px]"
        src={HeritageImg}
        alt="Nepal Heritage"
        draggable={false}
      />
      <div
        className={cn(
          "absolute left-0 right-0 bottom-0 z-10 h-14 sm:h-40",
          "bg-gradient-to-b from-transparent via-transparent to-gray-900"
        )}
      />
    </>
  );
}

export default FooterBottomMenuAndImage;
