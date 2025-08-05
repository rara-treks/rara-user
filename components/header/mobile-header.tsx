"use client";
import React from "react";
import CHNLogo from "../chn-logo";
import MobileMenu from "./mobile-menu";
import Link from "next/link";
import { TRANSPARENT_PATHS } from "./index";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import QuickSearchPopup from "../search/quick-search-popup";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import useHeader from "@/lib/hooks/use-header";

function MobileHeader() {
  const { isTransparent } = useHeader();

  return (
    <header className="relative z-10 md:hidden">
      <div
        className={cn(
          "px-6 grid grid-cols-2 gap-3 items-center py-4",
          !isTransparent && "border-b bg-white",
          isTransparent && "[&_svg]:text-white"
        )}
      >
        <Link href="/">
          <CHNLogo className="h-12 w-auto" variant={isTransparent ? "white" : "default"} />
        </Link>
        <div className="ml-auto flex gap-4 items-center">
          <QuickSearchPopup>
            <Button
              className={cn(
                "aspect-square h-8 p-0 rounded-full text-black",
                isTransparent && "backdrop-blur-lg bg-white/50"
              )}
              variant={isTransparent ? "secondary" : "outline"}
            >
              <IconSearch size={20} />
            </Button>
          </QuickSearchPopup>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
