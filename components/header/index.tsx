"use client";

import React, { Fragment, useState } from "react";
import CHNLogo from "../chn-logo";
import Link from "next/link";
import MobileHeader from "./mobile-header";
import { cn } from "@/lib/utils";
import useHeader from "@/lib/hooks/use-header";
import { EarthIcon, PhoneCallIcon, ChevronDown } from "lucide-react";
import NavigationMenu from "./NavigationMenu";
import Search from "./search";

// ✅ shadcn/ui imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const TRANSPARENT_PATHS = new Set(["/"]);

type AboutNavItem = {
  label: string;
  href: string;
};

const aboutNavItems: AboutNavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/about#our-story" },
  { label: "Journey", href: "/about#journey" },
  { label: "Our Team", href: "/about#our-team" },
  { label: "Why Travel With Us", href: "/about#why-travel" },
  { label: "Safety", href: "/about#safety" },
];

function Header() {
  const { isTransparent } = useHeader();
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 200);
    setHoverTimeout(timeout);
  };

  return (
    <Fragment>
      <header
        className={cn(
          "hidden w-full md:block relative z-50",
          !isTransparent && "border-b bg-[#F2F5F0]"
        )}
      >
        <div className="w-full container bg-[#F2F5F0] flex flex-col items-center">
          <div className="w-full px-8 flex justify-between shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-[20px] my-4 items-center py-3">
            {/* Logo */}
            <div>
              <Link href="/">
                <CHNLogo
                  variant= "default"
                  className="w-full h-14 text-white object-cover"
                />
              </Link>
            </div>

            {/* Navigation */}
            <div>
              <NavigationMenu />
            </div>

            {/* Search */}
            <div className="flex justify-center items-center">
              <Search />

            </div>

            {/* Right Section */}
            <div className="flex gap-8 justify-center items-center">
              {/* About Dropdown using shadcn */}
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center gap-2 text-gray-700 whitespace-nowrap hover:text-gray-900 transition-all"
                    >
                      <EarthIcon size={16} className="text-gray-400" />
                      About Us
                      <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-52"
                  >
                    <DropdownMenuLabel>About Us</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {aboutNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="w-full text-sm text-gray-700 hover:text-gray-900"
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Contact */}
              <Link href="/contact">
                <span className="flex items-center gap-2 text-gray-700 whitespace-nowrap hover:text-gray-900 transition-all">
                  <PhoneCallIcon size={16} className="text-gray-400" />
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileHeader />
    </Fragment>
  );
}

export default Header;
