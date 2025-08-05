"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import React from "react";
import { PRIMARY_MENU } from "./primary-menu";
import { cn } from "@/lib/utils";

function PrimaryMenuMobile() {
  const segments = useSelectedLayoutSegments();
  const basePath = `/${segments?.[segments.length - 1]}`;

  return (
    <nav>
      <ul className="flex flex-col">
        {PRIMARY_MENU.map((item, index) => (
          // eslint-disable-next-line jsx-a11y/role-supports-aria-props
          <li
            className={cn(
              "font-semibold text-lg md:text-base px-3 py-1.5 rounded-full",
              "aria-selected:text-primary aria-selected:bg-primary",
              "group"
            )}
            key={index}
            aria-selected={basePath === item.href}
          >
            <Link className="grid grid-cols-[24px_auto] gap-1 items-center" href={item.href} title={item.title}>
              <item.icon className="w-5 h-5 group-aria-selected:invert text-black" />
              <span className="group-aria-selected:text-white ">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PrimaryMenuMobile;
