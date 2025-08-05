"use client";
import React, { Fragment } from "react";
import CHNLogo from "../chn-logo";
import Link from "next/link";
import PrimaryMenu from "./primary-menu";
import MobileHeader from "./mobile-header";
import { cn } from "@/lib/utils";
import ProfileButton from "./profile-button";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import QuickSearchPopup from "../search/quick-search-popup";
import useHeader from "@/lib/hooks/use-header";

export const TRANSPARENT_PATHS = new Set(["/"]);

function Header() {
  const { isTransparent } = useHeader();

  return (
    <Fragment>
      <header className={cn("hidden md:block relative z-50", !isTransparent && "border-b bg-white")}>
        <div className="container grid grid-cols-[150px_1fr_150px] gap-3 items-center py-3">
          <div>
            <Link href="/">
              <CHNLogo variant={isTransparent ? "white" : "default"} className="w-auto h-14 text-white" />
            </Link>
          </div>
          <div className={cn("flex gap-4 justify-center", isTransparent && "text-white")}>
            <PrimaryMenu />
          </div>
          <div className="flex gap-2 justify-self-end">
            <QuickSearchPopup>
              <Button
                className={cn(
                  "aspect-square p-0 rounded-full text-black",
                  isTransparent && "backdrop-blur-lg bg-white/50"
                )}
                variant={isTransparent ? "secondary" : "outline"}
              >
                <IconSearch size={20} />
              </Button>
            </QuickSearchPopup>
            <ProfileButton
              className={cn("hidden md:flex", isTransparent && "backdrop-blur-lg bg-white/50")}
              variant={isTransparent ? "secondary" : "default"}
            />
          </div>
        </div>
      </header>
      <MobileHeader />
    </Fragment>
  );
}

export default Header;
