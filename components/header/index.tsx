"use client";
import React, { Fragment } from "react";
import CHNLogo from "../chn-logo";
import Link from "next/link";
import MobileHeader from "./mobile-header";
import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import useHeader from "@/lib/hooks/use-header";
import { EarthIcon, PhoneCallIcon } from "lucide-react";
import NavigationMenu from "./NavigationMenu";

export const TRANSPARENT_PATHS = new Set(["/"]);

function Header() {
  const { isTransparent } = useHeader();

  return (
    <Fragment>
      <header
        className={cn(
          "hidden w-fullw md:block relative  z-50 mb-6",
          !isTransparent && "border-b bg-[#F2F5F0]"
        )}
      >
        <div className="w-full container bg-[#F2F5F0]  flex flex-col items-center">
          <div className=" w-full px-8 flex justify-between shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-[20px] my-8 items-center py-3">
            <div>
              <Link href="/">
                <CHNLogo
                  variant={isTransparent ? "white" : "default"}
                  className="w-full h-14 text-white object-cover"
                />
              </Link>
            </div>

            <div className="flex w-[600px] justify-center items-center">
              {/* <QuickSearchPopup> */}
              <div className="w-full flex items-center  border border-gray-300 rounded-full h-10 px-4 gap-3">
                <input
                  type="text"
                  placeholder="Choose your destination..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />
                <IconSearch size={20} className="text-gray-400 flex-shrink-0" />
              </div>
              {/* </QuickSearchPopup> */}
            </div>

            <div className="flex gap-8 justify-center items-center">
              <Link href="/about">
                <span className="flex items-center gap-2 text-gray-700 whitespace-nowrap">
                  <EarthIcon size={16} className="text-gray-400" />
                  About Us
                </span>
              </Link>
              <Link href="/contact">
                <span className="flex items-center gap-2 text-gray-700 whitespace-nowrap">
                  <PhoneCallIcon size={16} className="text-gray-400" />
                  Contact Us
                </span>
              </Link>
            </div>
          </div>

          <NavigationMenu />
        </div>
      </header>
      <MobileHeader />
    </Fragment>
  );
}

export default Header;
