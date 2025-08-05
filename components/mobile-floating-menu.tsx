"use client";
import React from "react";
import IconHome from "./icons/home";
import IconTrekking from "./icons/trekking";
import IconOpenBook from "./icons/open-book";
import IconGroup from "./icons/group";
import IconEarth from "./icons/earth";
import Link from "next/link";
import { cn } from "@/lib/utils";

function MobileFloatingMenu() {
  return (
    <aside className="fixed bottom-0 left-0 right-0 bg-white z-50 sm:hidden shadow-[0_-5px_10px_0px_#00000024] max-h-16">
      <div
        className={cn(  
          "grid grid-cols-5 px-2 py-3 items-center justify-items-center max-w-96 mx-auto",
          "[&_h5]:mt-1 [&_h5]:text-xs [&_h5]:text-center [&_h5]:font-medium [&_svg]:mx-auto"
        )}
      >
        <Link href="/homestays">
          <IconHome className="w-5 h-5" />
          <h5>Homestay</h5>
        </Link>
        <Link href="/circuits">
          <IconTrekking className="w-5 h-5" />
          <h5>Circuit</h5>
        </Link>
        <Link
          href="/blog"
          className="flex items-center justify-center rounded-full p-2 aspect-square -mt-10 w-14 h-14 bg-gradient-orange"
        >
          <IconOpenBook className="w-7 h-7 text-white" />
        </Link>
        <Link href="experiences">
          <IconGroup className="w-5 h-5" />
          <h5>Experience</h5>
        </Link>
        <Link href="packages">
          <IconEarth className="w-5 h-5" />
          <h5>Packages</h5>
        </Link>
      </div>
      <style jsx global>
        {`
          @media (max-width: 639px) {
            body > footer {
              margin-bottom: 64px !important;
            }
          }
        `}
      </style>
    </aside>
  );
}

export default MobileFloatingMenu;
