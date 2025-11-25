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
  { label: "Who we are", href: "/about#who_we_are" },
  { label: "What we do", href: "/about#what_we_do" },
  { label: "Mission", href: "/about#mission" },
  { label: "Our Team", href: "/about#our-team" },
];

function Header() {
  const { isTransparent } = useHeader();
  const [isOpen, setIsOpen] = useState(false);

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
                  variant={isTransparent ? "white" : "default"}
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
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 text-gray-700 whitespace-nowrap hover:text-gray-900 transition-all"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <EarthIcon size={16} className="text-gray-400" />
                    About Us
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
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
