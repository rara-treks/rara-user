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

  const content = (
    <div className="flex flex-col items-center gap-1 cursor-pointer transition-colors duration-200">
      <IconComponent
        size={32}
        className={isActive ? "text-[#1E2F22]" : "text-[#1E2F22]/40"}
      />
      <span className="flex items-center gap-1">
        <p className={isActive ? "text-gray-800" : "text-gray-400"}>{label}</p>
        {hasDropdown && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isActive ? "rotate-180" : ""
            }`}
          />
        )}
      </span>
    </div>
  );

  if (!hasDropdown && slug) {
    return <Link href={slug}>{content}</Link>;
  }

  return content;
};

export default NavItem;
