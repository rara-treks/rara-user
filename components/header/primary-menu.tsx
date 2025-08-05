"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import React from "react";
import IconHome from "../icons/home";
import IconGroup from "../icons/group";
import IconTrekking from "../icons/trekking";
import IconEarth from "../icons/earth";
import IconOpenBook from "../icons/open-book";
import { IconHeartSpark, IconInfoCircleFilled } from "@tabler/icons-react";
import useHeader from "@/lib/hooks/use-header";
import { cn } from "@/lib/utils";

export const PRIMARY_MENU = [
  {
    title: "Packages",
    href: "/packages",
    icon: IconEarth,
  },
  {
    title: "Homestays",
    href: "/homestays",
    icon: IconHome,
  },
  {
    title: "Experiences",
    href: "/experiences",
    icon: IconGroup,
  },
  {
    title: "Circuits",
    href: "/circuits",
    icon: IconTrekking,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: IconOpenBook,
  },
  {
    title: "Impact",
    href: "/impact",
    icon: IconHeartSpark,
  },
  {
    title: "About",
    href: "/about",
    icon: IconInfoCircleFilled,
  },
];

function PrimaryMenu() {
  const segments = useSelectedLayoutSegments();
  const basePath = `/${segments?.[segments.length - 1]}`;
  const { isTransparent } = useHeader();

  return (
    <nav>
      <ul className="flex flex-wrap gap-x-5 justify-center">
        {PRIMARY_MENU.map((item, index) => (
          <li
            className={cn(
              "font-semibold text-lg md:text-base data-[active='true']:text-primary transition-colors",
              isTransparent ? "hover:text-black" : "hover:text-primary"
            )}
            key={index}
            data-active={basePath === item.href}
          >
            <Link href={item.href} title={item.title}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PrimaryMenu;
