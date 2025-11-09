import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  PersonSimpleHike,
  Jeep,
  Mountains,
  AirplaneTakeoff,
  PersonSimpleTaiChi,
} from "@phosphor-icons/react";

interface NavItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  hasDropdown?: boolean;
  slug?: string;
}

const iconComponents = {
  PersonSimpleHike,
  Jeep,
  Mountains,
  AirplaneTakeoff,
  PersonSimpleTaiChi,
};

const NavItem = ({
  icon,
  label,
  isActive,
  hasDropdown = false,
  slug,
}: NavItemProps) => {
  const IconComponent = iconComponents[icon as keyof typeof iconComponents];

  // If icon is not found, return null or a default icon
  if (!IconComponent) {
    return null;
  }

  const content = (
    <div className="flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 group">
      {/* <IconComponent
        size={32}
        weight={isActive ? "fill" : "regular"}
        className={`transition-all duration-200 ${
          isActive
            ? "text-green-600"
            : "text-[#1E2F22]/40 group-hover:text-[#1E2F22]/70 group-hover:scale-110"
        }`}
      /> */}
      <span className="flex items-center gap-1">
        <p
          className={`text-sm transition-colors duration-200 ${
            isActive
              ? "text-green-600 font-semibold"
              : "text-gray-600 font-medium group-hover:text-gray-800"
          }`}
        >
          {label}
        </p>
        {hasDropdown && (
          <ChevronDown
            size={16}
            className={`transition-all duration-200 ${
              isActive
                ? "rotate-180 text-green-600"
                : "text-gray-500 group-hover:text-gray-700"
            }`}
          />
        )}
      </span>
    </div>
  );

  // Only wrap in Link if there's no dropdown and a slug is provided
  if (!hasDropdown && slug) {
    return (
      <Link href={slug} className="no-underline">
        {content}
      </Link>
    );
  }

  return content;
};

export default NavItem;
