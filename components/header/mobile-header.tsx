"use client";
import React, { useState } from "react";
import CHNLogo from "../chn-logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useHeader from "@/lib/hooks/use-header";
import { Search } from "lucide-react";
import MobileMenu from "./mobile-menu";
import MobileSearchPopup from "./Search/mobile-search-popup";

function MobileHeader() {
  const { isTransparent } = useHeader();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="relative z-10 md:hidden">
        <div
          className={cn(
            "px-6 gap-3 items-center py-4",
            !isTransparent && "border-b bg-white",
            isTransparent && "[&_svg]:text-white"
          )}
        >
          <div className="w-full px-4 flex flex-col justify-between shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-full mt-8 mb-3 items-center py-3">
            <div className="flex w-full justify-between items-center">
              <div>
                <Link href="/">
                  <CHNLogo
                    variant={isTransparent ? "white" : "default"}
                    className="w-full h-14 object-contain"
                  />
                </Link>
              </div>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="px-4 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <Search size={20} stroke="gray" />
              </button>
            </div>
          </div>
          <MobileMenu />
        </div>
      </header>

      <MobileSearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

export default MobileHeader;
